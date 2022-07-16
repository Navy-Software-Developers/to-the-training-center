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
        fields = ('user', 'mos', 'notification')

