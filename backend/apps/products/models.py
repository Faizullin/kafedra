from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django_softdelete.models import SoftDeleteModel
from filer.fields.image import FilerImageField
from utils.models import AbstractTimestampedModel, models, AbstractMetaModel, \
    AbstractActiveModel

UserModel = get_user_model()


class Offer(AbstractTimestampedModel, AbstractActiveModel):
    name = models.CharField()
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(100)
        ],
    )

    class Meta:
        verbose_name = _("Offer")
        verbose_name_plural = _("Offers")


class ProductBrand(AbstractTimestampedModel, SoftDeleteModel, AbstractMetaModel, AbstractActiveModel):
    name = models.CharField(_("Name"), max_length=50)
    slug = models.SlugField(_("Slug"), unique=True)

    class Meta:
        verbose_name = _("Brand")
        verbose_name_plural = _("Brands")


class ProductCategory(AbstractTimestampedModel, SoftDeleteModel, AbstractMetaModel, AbstractActiveModel):
    name = models.CharField(_("Name"), max_length=50)
    slug = models.SlugField(_("Slug"), unique=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

# print(FILER_IMAGE_MODEL)
from filer.models import  Image
# Image = load_model(FILER_IMAGE_MODEL)


class Product(AbstractTimestampedModel, SoftDeleteModel, AbstractMetaModel, AbstractActiveModel):
    name = models.CharField(_("Name"), help_text=_("The name of the product."), max_length=80, blank=True)
    slug = models.SlugField(
        _("Slug"), help_text=_("The unique last part of the Product's URL."), unique=True, max_length=120
    )
    base_price = models.DecimalField(max_digits=6, decimal_places=2)
    unit = models.CharField(_("Unit"), blank=True, max_length=15)
    rating = models.DecimalField(max_digits=6, decimal_places=2,
                                 null=True, blank=True)
    short_description = models.TextField(_("Short description"), blank=True)
    description = models.TextField(_("Description"), blank=True)

    related_products = models.ManyToManyField(
        "self",
        verbose_name=_("Related products"),
        blank=True,
        symmetrical=False,
        related_name="reverse_related_products",
    )
    supplier = models.ForeignKey(UserModel, models.SET_NULL, related_name="products", null=True, blank=True)
    thumbnail_image = FilerImageField(null=True, blank=True, on_delete=models.CASCADE, related_name="thumbnail_product")
    detail_images = models.ManyToManyField(Image, blank=True, through='ProductImageModel')



    brand = models.ForeignKey(ProductBrand, null=True, blank=True, on_delete=models.SET_NULL,
                              related_name="products")
    category = models.ForeignKey(ProductCategory, null=True, blank=True, on_delete=models.SET_NULL,
                                 related_name="products")
    offer = models.ForeignKey(Offer, null=True, blank=True, on_delete=models.SET_NULL, )
    price_of_offer = models.DecimalField(max_digits=6, decimal_places=2)

    # tax = models.ForeignKey(Tax, models.SET_NULL, verbose_name=_("Tax"), blank=True, null=True)

    class Meta:
        ordering = ['-id']
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return 'name: {}'.format(self.name)


class ProductImageModel(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    position = models.PositiveIntegerField()

    class Meta(object):
        unique_together = ('product', 'image')



class ProductReview(AbstractTimestampedModel):
    product = models.ForeignKey(Product, verbose_name=_("Product"), null=True,
                                blank=True, on_delete=models.SET_NULL, related_name="reviews")
    author = models.ForeignKey(UserModel, verbose_name=_("Author"), null=True,
                               blank=True, on_delete=models.SET_NULL)
    score = models.SmallIntegerField(_("Score"), default=0,
                                     validators=[MinValueValidator(1), MaxValueValidator(10)])
    title = models.CharField(_("Title"), max_length=254)
    comment = models.TextField(_("Comment"), )

    class Meta:
        verbose_name = _("Product Review")
        verbose_name_plural = _("Product Reviews")

    def __str__(self):
        return 'user: {}, review_title: {}'.format(self.author,
                                                   self.title)
