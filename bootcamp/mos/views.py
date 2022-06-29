from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Mos
from .serializers import MosSerializer



from env import *
import requests
from xml.etree.ElementTree import parse
import xmltodict
import json

# Create your views here.
@api_view(['GET'])
def list(request):
    serializer = MosSerializer(Mos.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def update(request):
    url = 'http://apis.data.go.kr/1300000/gsTgMastr/list/gsTgMastr/list'
    total = 100
    i = 1

    while i <= total//100:
        params ={'serviceKey' : serviceKey, 'numOfRows' : '100', 'pageNo' : str(i) }
        response = requests.get(url, params=params)
        xml_parse = xmltodict.parse(response.content.decode('utf-8'))
        xml_dict = json.loads(json.dumps(xml_parse))
        items = xml_dict['response']['body']['items']['item']

        print(items)
        print(len(items))
        for item in items:
            obj, created = Mos.objects.get_or_create(
                gunGbcd = item['gunGbcd'],
                gsteukgiCd = item['gsteukgiCd'],
                defaults={'gsteukgiNm': item['gsteukgiNm']})
            print(obj, created)

        if i == 1:
            total = int(xml_dict['response']['body']['totalCount'])
        i += 1

    return Response("updated!")

@api_view(['GET'])
def HelloAPI(request):
    return Response("Hello API!")