from filer.models import Image

from utils.serializers import serializers, TimestampedSerializer, get_datetime_formatted
from .models import Product, ProductCategory, Offer, ProductBrand


class OfferSerializer(TimestampedSerializer):
    valid_from = serializers.SerializerMethodField(read_only=True)
    valid_to = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Offer
        fields = ['id', 'name', 'valid_from', 'valid_to', 'discount']

    def get_valid_from(self, obj):
        return get_datetime_formatted(obj.valid_from)

    def get_valid_to(self, obj):
        return get_datetime_formatted(obj.valid_to)


class ProductBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ['id', 'slug', 'name', ]


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'slug', 'name', ]


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Image
        fields = ['id', 'name', 'url', 'width', 'height' ]

    def get_url(self, obj: Image):
        ret_url = obj.url
        if ret_url:
            return self.context['request'].build_absolute_uri(ret_url)


class ProductListSerializer(serializers.ModelSerializer):
    thumbnail_image = serializers.SerializerMethodField(read_only=True)
    brand = ProductBrandSerializer(read_only=True)
    category = ProductCategorySerializer(read_only=True)
    offer = OfferSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'slug', 'name', 'base_price', 'price_of_offer', 'offer',
                  'brand',
                  'category', 'thumbnail_image', 'use_ssr', 'render_url']

    def get_thumbnail_image(self, obj: Product):
        return ProductImageSerializer(obj.thumbnail_image, read_only=True, context={
            'request': self.context['request'],
        }).data


class ProductRetrieveSerializer(serializers.ModelSerializer):
    thumbnail_image = serializers.SerializerMethodField(read_only=True)
    detail_images = serializers.SerializerMethodField(read_only=True)
    brand = ProductBrandSerializer(read_only=True)
    category = ProductCategorySerializer(read_only=True)
    offer = OfferSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'slug', 'name', 'base_price', 'price_of_offer', 'offer',
                  'brand',
                  'category', 'description', 'thumbnail_image', 'detail_images']

    def get_thumbnail_image(self, obj: Product):
        return ProductImageSerializer(obj.thumbnail_image, read_only=True, context={
            'request': self.context['request'],
        }).data

    def get_detail_images(self, obj: Product):
        return ProductImageSerializer(obj.detail_images, read_only=True, context={
            'request': self.context['request'],
        }, many=True).data
