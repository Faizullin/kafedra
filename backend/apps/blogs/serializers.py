from utils.serializers import TimestampedSerializer, serializers
from .models import BlogPost, UserModel, BlogComment, BlogPostCategory


class BlogAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ('id', 'username', 'first_name', 'last_name')


class BlogPostCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostCategory
        exclude = ('id', 'slug', 'title')


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogPostCategorySerializer(read_only=True)
    author = BlogAuthorSerializer(read_only=True)

    class Meta:
        model = BlogPost
        exclude = ('id', 'slug', 'status', 'author', 'category')


class BlogPostRetrieveSerializer(TimestampedSerializer):
    category = BlogPostCategorySerializer(read_only=True)
    author = BlogAuthorSerializer(read_only=True)

    class Meta:
        model = BlogPost
        exclude = ('id', 'slug', 'status', 'author', 'category', 'content', 'created_at', 'updated_at')


class BlogCommentSerializer(TimestampedSerializer):
    author = BlogAuthorSerializer(read_only=True)

    class Meta:
        model = BlogComment
        fields = ('id', 'author', 'title', 'message', 'created_at', 'updated_at')
