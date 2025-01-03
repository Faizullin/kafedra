import os
import shutil
import zipfile
from django.core.management.base import BaseCommand
from django.core.serializers import serialize
from django.conf import settings
from django.apps import apps
from django.db import models

class Command(BaseCommand):
    help = "Export the entire database and media files"

    def handle(self, *args, **kwargs):
        export_dir = os.path.join(settings.BASE_DIR, 'exported_data')
        if not os.path.exists(export_dir):
            os.makedirs(export_dir)

        # Export database
        self.stdout.write("Exporting database...")
        db_file = os.path.join(export_dir, 'database.json')
        with open(db_file, 'w') as f:
            all_data = []
            for model in apps.get_models():
                model_data = serialize('json', model.objects.all())
                all_data.append(model_data)
            f.write("[\n" + ",\n".join(all_data) + "\n]")
        self.stdout.write(f"Database exported to {db_file}")

        # Export media files
        self.stdout.write("Exporting media files...")
        media_dir = settings.MEDIA_ROOT
        if os.path.exists(media_dir):
            media_zip = os.path.join(export_dir, 'media_files.zip')
            with zipfile.ZipFile(media_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, _, files in os.walk(media_dir):
                    for file in files:
                        file_path = os.path.join(root, file)
                        zipf.write(file_path, os.path.relpath(file_path, media_dir))
            self.stdout.write(f"Media files exported to {media_zip}")
        else:
            self.stdout.write("No media files to export.")

        # Export models
        self.stdout.write("Exporting models to models.py...")
        models_file = os.path.join(export_dir, 'models.py')
        with open(models_file, 'w') as f:
            f.write("from django.db import models\n\n")
            for model in apps.get_models():
                self.write_model_definition(f, model)
        self.stdout.write(f"Models exported to {models_file}")

        # Summarize
        self.stdout.write(f"Export completed. Data saved in {export_dir}")


    def write_model_definition(self, file, model):
        """
        Write the Python code for the model definition to the file.
        """
        file.write(f"class {model.__name__}(models.Model):\n")
        for field in model._meta.fields:
            field_name = field.name
            field_type = type(field).__name__
            field_args = []

            # Handle primary key
            if field.primary_key:
                field_args.append("primary_key=True")

            # Handle null and blank
            if not field.null:
                field_args.append("null=False")
            if field.blank:
                field_args.append("blank=True")

            # Handle default
            if field.has_default() and field.default is not models.fields.NOT_PROVIDED:
                field_args.append(f"default={repr(field.default)}")

            # Combine field arguments
            args_string = ", ".join(field_args)
            file.write(f"    {field_name} = models.{field_type}({args_string})\n")
        file.write("\n")