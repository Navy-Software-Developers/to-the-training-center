from rest_framework import serializers
from .models import Mos, Wiki

class MosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mos
        fields = ('pk', 'code', 'name', 'branch')


class WikiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wiki
        fields = ('content', 'modifier', 'modified')

