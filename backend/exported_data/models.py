from django.db import models

class LogEntry(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    action_time = models.DateTimeField(null=False, default=<function now at 0x7f03ab10bb00>)
    user = models.ForeignKey(null=False)
    content_type = models.ForeignKey(blank=True)
    object_id = models.TextField(blank=True)
    object_repr = models.CharField(null=False)
    action_flag = models.PositiveSmallIntegerField(null=False)
    change_message = models.TextField(null=False, blank=True)

class Permission(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    name = models.CharField(null=False)
    content_type = models.ForeignKey(null=False)
    codename = models.CharField(null=False)

class Group(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    name = models.CharField(null=False)

class ContentType(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    app_label = models.CharField(null=False)
    model = models.CharField(null=False)

class Session(models.Model):
    session_key = models.CharField(primary_key=True, null=False)
    session_data = models.TextField(null=False)
    expire_date = models.DateTimeField(null=False)

class Site(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    domain = models.CharField(null=False)
    name = models.CharField(null=False)

class Token(models.Model):
    key = models.CharField(primary_key=True, null=False)
    user = models.OneToOneField(null=False)
    created = models.DateTimeField(null=False, blank=True)

class TokenProxy(models.Model):
    key = models.CharField(primary_key=True, null=False)
    user = models.OneToOneField(null=False)
    created = models.DateTimeField(null=False, blank=True)

class EmailAddress(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    user = models.ForeignKey(null=False)
    email = models.EmailField(null=False)
    verified = models.BooleanField(null=False, default=False)
    primary = models.BooleanField(null=False, default=False)

class EmailConfirmation(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    email_address = models.ForeignKey(null=False)
    created = models.DateTimeField(null=False, default=<function now at 0x7f03ab10bb00>)
    sent = models.DateTimeField()
    key = models.CharField(null=False)

class SocialApp(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    provider = models.CharField(null=False)
    provider_id = models.CharField(null=False, blank=True)
    name = models.CharField(null=False)
    client_id = models.CharField(null=False)
    secret = models.CharField(null=False, blank=True)
    key = models.CharField(null=False, blank=True)
    settings = models.JSONField(null=False, blank=True, default=<class 'dict'>)

class SocialAccount(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    user = models.ForeignKey(null=False)
    provider = models.CharField(null=False)
    uid = models.CharField(null=False)
    last_login = models.DateTimeField(null=False, blank=True)
    date_joined = models.DateTimeField(null=False, blank=True)
    extra_data = models.JSONField(null=False, default=<class 'dict'>)

class SocialToken(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    app = models.ForeignKey(blank=True)
    account = models.ForeignKey(null=False)
    token = models.TextField(null=False)
    token_secret = models.TextField(null=False, blank=True)
    expires_at = models.DateTimeField(blank=True)

class TaskResult(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    task_id = models.CharField(null=False)
    periodic_task_name = models.CharField()
    task_name = models.CharField()
    task_args = models.TextField()
    task_kwargs = models.TextField()
    status = models.CharField(null=False, default='PENDING')
    worker = models.CharField(default=None)
    content_type = models.CharField(null=False)
    content_encoding = models.CharField(null=False)
    result = models.TextField(default=None)
    date_created = models.DateTimeField(null=False, blank=True)
    date_done = models.DateTimeField(null=False, blank=True)
    traceback = models.TextField(blank=True)
    meta = models.TextField(default=None)

class ChordCounter(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    group_id = models.CharField(null=False)
    sub_tasks = models.TextField(null=False)
    count = models.PositiveIntegerField(null=False)

class GroupResult(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    group_id = models.CharField(null=False)
    date_created = models.DateTimeField(null=False, blank=True)
    date_done = models.DateTimeField(null=False, blank=True)
    content_type = models.CharField(null=False)
    content_encoding = models.CharField(null=False)
    result = models.TextField(default=None)

class SolarSchedule(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    event = models.CharField(null=False)
    latitude = models.DecimalField(null=False)
    longitude = models.DecimalField(null=False)

class IntervalSchedule(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    every = models.IntegerField(null=False)
    period = models.CharField(null=False)

class ClockedSchedule(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    clocked_time = models.DateTimeField(null=False)

class CrontabSchedule(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    minute = models.CharField(null=False, default='*')
    hour = models.CharField(null=False, default='*')
    day_of_month = models.CharField(null=False, default='*')
    month_of_year = models.CharField(null=False, default='*')
    day_of_week = models.CharField(null=False, default='*')
    timezone = models.TimeZoneField(null=False, default=<function crontab_schedule_celery_timezone at 0x7f03a92511c0>)

class PeriodicTasks(models.Model):
    ident = models.SmallIntegerField(primary_key=True, null=False, default=1)
    last_update = models.DateTimeField(null=False)

class PeriodicTask(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=True)
    name = models.CharField(null=False)
    task = models.CharField(null=False)
    interval = models.ForeignKey(blank=True)
    crontab = models.ForeignKey(blank=True)
    solar = models.ForeignKey(blank=True)
    clocked = models.ForeignKey(blank=True)
    args = models.TextField(null=False, blank=True, default='[]')
    kwargs = models.TextField(null=False, blank=True, default='{}')
    queue = models.CharField(blank=True, default=None)
    exchange = models.CharField(blank=True, default=None)
    routing_key = models.CharField(blank=True, default=None)
    headers = models.TextField(null=False, blank=True, default='{}')
    priority = models.PositiveIntegerField(blank=True, default=None)
    expires = models.DateTimeField(blank=True)
    expire_seconds = models.PositiveIntegerField(blank=True)
    one_off = models.BooleanField(null=False, default=False)
    start_time = models.DateTimeField(blank=True)
    enabled = models.BooleanField(null=False, default=True)
    last_run_at = models.DateTimeField(blank=True)
    total_run_count = models.PositiveIntegerField(null=False, default=0)
    date_changed = models.DateTimeField(null=False, blank=True)
    description = models.TextField(null=False, blank=True)

class CustomUser(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    password = models.CharField(null=False)
    last_login = models.DateTimeField(blank=True)
    is_superuser = models.BooleanField(null=False, default=False)
    username = models.CharField(null=False)
    first_name = models.CharField(null=False, blank=True)
    last_name = models.CharField(null=False, blank=True)
    email = models.EmailField(null=False, blank=True)
    is_staff = models.BooleanField(null=False, default=False)
    is_active = models.BooleanField(null=False, default=True)
    date_joined = models.DateTimeField(null=False, default=<function now at 0x7f03ab10bb00>)
    deleted_at = models.DateTimeField(blank=True)
    restored_at = models.DateTimeField(blank=True)
    transaction_id = models.UUIDField(blank=True)
    approval_status = models.CharField(null=False, default=UserApprovalStatus.PENDING)

class PostCategory(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    title = models.CharField(null=False)
    slug = models.SlugField(null=False)

class Post(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    deleted_at = models.DateTimeField(blank=True)
    restored_at = models.DateTimeField(blank=True)
    transaction_id = models.UUIDField(blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    meta_title = models.CharField(null=False, blank=True)
    meta_keywords = models.CharField(null=False, blank=True)
    meta_description = models.TextField(null=False, blank=True)
    use_ssr = models.BooleanField(null=False, default=False)
    render_url = models.CharField(null=False, blank=True)
    title = models.CharField(null=False)
    slug = models.SlugField(null=False)
    author = models.ForeignKey(null=False)
    category = models.ForeignKey(blank=True)
    content = models.TextField(null=False)
    meta_data = models.TextField(null=False, default='')
    status = models.IntegerField(null=False, default=PostStatus.DRAFT)

class PostComment(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    post = models.ForeignKey(blank=True)
    author = models.ForeignKey(blank=True)
    title = models.CharField(null=False)
    message = models.TextField(null=False)

class Notification(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    level = models.CharField(null=False, default='info')
    recipient = models.ForeignKey(null=False)
    unread = models.BooleanField(null=False, default=True)
    actor_content_type = models.ForeignKey(null=False)
    actor_object_id = models.CharField(null=False)
    verb = models.CharField(null=False)
    description = models.TextField(blank=True)
    target_content_type = models.ForeignKey(blank=True)
    target_object_id = models.CharField(blank=True)
    action_object_content_type = models.ForeignKey(blank=True)
    action_object_object_id = models.CharField(blank=True)
    timestamp = models.DateTimeField(null=False, default=<function now at 0x7f03ab10bb00>)
    public = models.BooleanField(null=False, default=True)
    deleted = models.BooleanField(null=False, default=False)
    emailed = models.BooleanField(null=False, default=False)
    data = models.JSONField(blank=True)

class Image(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    name = models.CharField(null=False, blank=True)
    extension = models.CharField(null=False, blank=True)
    alt = models.CharField(null=False, blank=True)
    url = models.URLField(null=False, blank=True)
    size = models.CharField(null=False, blank=True)
    file_type = models.CharField(null=False, default='file')
    parent = models.BigIntegerField(blank=True)
    file = models.FileField(blank=True)

class File(models.Model):
    id = models.BigAutoField(primary_key=True, null=False, blank=True)
    created_at = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateTimeField(null=False, blank=True)
    name = models.CharField(null=False, blank=True)
    extension = models.CharField(null=False, blank=True)
    alt = models.CharField(null=False, blank=True)
    url = models.URLField(null=False, blank=True)
    size = models.CharField(null=False, blank=True)
    file_type = models.CharField(null=False, default='file')
    parent = models.BigIntegerField(blank=True)
    file = models.FileField(blank=True)

