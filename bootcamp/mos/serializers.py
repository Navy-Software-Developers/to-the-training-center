from rest_framework import serializers
from .models import Mos

class MosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mos
        fields = ('pk', 'code', 'name', 'branch')

