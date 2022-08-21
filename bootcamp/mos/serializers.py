from rest_framework import serializers
from .models import *

class MosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mos
        fields = ('pk', 'code', 'name', 'branch')


class WikiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wiki
        fields = ('content', 'modifier', 'modified')


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('user', 'mos', 'notification', 'get_mos_name')


class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = ('pk', 'name', 'category', 'level', 'get_count_from_MMA', 'get_count_from_user')


class MosReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MosReview
        fields = ('pk', 'user', 'get_username', 'rating1', 'rating2', 'rating3', 'rating4', 'rating5', 'review', 'advantage', 'disadvantage', 'modified')