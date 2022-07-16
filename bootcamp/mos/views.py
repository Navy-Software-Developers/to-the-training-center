from django.shortcuts import render, get_object_or_404
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *



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
def detail(request, pk):
    BRANCH = ['', '육군', '해군', '공군', '해병대']
    try:
        ob = Mos.objects.get(pk=pk)
    except Mos.DoesNotExist:
        return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
    result = dict()
    result['code'] = ob.code
    result['name'] = ob.name
    result['branch'] = ob.branch # BRANCH[ob.branch]
    result['wiki'] = ob.currentWiki.content if ob.currentWiki else ""
    result['wiki_modified_date'] = ob.currentWiki.modified if ob.currentWiki else ""
    recs = Recurit.objects.filter(mos=ob)
    result['recurits'] = [model_to_dict(rec) for rec in recs]

    return Response(result)


@api_view(['GET'])
def update_mos(request):
    url = 'http://apis.data.go.kr/1300000/gsTgMastr/list/gsTgMastr/list'
    total = 100
    i = 1

    while i <= total//100:
        params ={'serviceKey' : serviceKey, 'numOfRows' : '100', 'pageNo' : str(i) }
        response = requests.get(url, params=params)
        xml_parse = xmltodict.parse(response.content.decode('utf-8'))
        xml_dict = json.loads(json.dumps(xml_parse))
        items = xml_dict['response']['body']['items']['item']

        for item in items:
            obj, created = Mos.objects.get_or_create(
                branch = item['gunGbcd'],
                code = item['gsteukgiCd'],
                defaults={'name': item['gsteukgiNm']})
            print(obj, created)

        if i == 1:
            total = int(xml_dict['response']['body']['totalCount'])
        i += 1

    return Response({'status': 'success'})


@api_view(['GET'])
def update_recurit(request):
    # BRANCH = ['', '육군', '해군', '공군', '해병대']
    BRANCH = {'육군': 1, '해군': 2, '공군': 3, '해병':4}

    url = 'http://apis.data.go.kr/1300000/MJBGJWJeopSuHH3/list'
    total = 100
    i = 1

    while i <= total//100:
        params ={'serviceKey' : serviceKey, 'numOfRows' : '100', 'pageNo' : str(i) }
        response = requests.get(url, params=params)
        xml_parse = xmltodict.parse(response.content.decode('utf-8'))
        xml_dict = json.loads(json.dumps(xml_parse))
        items = xml_dict['response']['body']['items']['item']

        for item in items:
            try:
                mos = Mos.objects.get(branch = BRANCH[item['gunGbnm']], code = item['gsteukgiCd'])
                obj, created = Recurit.objects.get_or_create(
                    mos = mos,
                    recuritYear = int(item['mojipYy']),
                    recuritRound = int(item['mojipTms']),
                    enlistMilitaryUnit = item['iybudaeCdm'],
                    defaults={'recuritCnt': int(item['seonbalPcnt']),
                            'applyedCnt': int(item['jeopsuPcnt']),
                            'recuritStart': int(item['jeopsuSjdtm']),
                            'recuritEnd': int(item['jeopsuJrdtm']),
                            'enlistStart': int(item['iyyjsijakYm']),
                            'enlistEnd': int(item['iyyjjongryoYm']),
                            })
                print(obj, created)
            except:
                print("찾을수없음")

        if i == 1:
            total = int(xml_dict['response']['body']['totalCount'])
        i += 1

    return Response({'status': 'success'})

@api_view(['GET', 'POST'])
def wiki(request, pk):
    try:
        mos = Mos.objects.get(pk=pk)
    except Mos.DoesNotExist:
        return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(WikiSerializer(Wiki.objects.get(mos=mos)).data)
    elif request.method == 'POST':
        new = Wiki.objects.create(mos=mos, content=request.POST['content'], modifier=request.user)
        mos['currentWiki'] = new
        mos.save()

        return Response({'status': 'success'})


@api_view(['GET', 'POST', 'DELETE'])
def like(request, pk):
    try:
        mos = Mos.objects.get(pk=pk)
    except Mos.DoesNotExist:
        return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        try:
            like = Like.objects.get(mos=mos, user=request.user)
            return Response(LikeSerializer(like).data)
        except Like.DoesNotExist:
            return Response({'result': 'notLike'})
        except:
            return Response({'status': 'failed'})

    elif request.method == 'POST':
        Like.objects.create(mos=mos, user=request.user)

        return Response({'status': 'success'})

    elif request.method == 'PUT':
        try:
            Like.objects.get(mos=mos, user=request.user).notification = bool(request.POST['notification'])

            return Response({'status': 'success'})
        except:
            return Response({'status': 'failed'})

    elif request.method == 'DELETE':
        try:
            Like.objects.get(mos=mos, user=request.user).delete()

            return Response({'status': 'success'})
        except:
            return Response({'status': 'failed'})



@api_view(['GET'])
def likes(request):
    try:
        like = Like.objects.filter(user=request.user)
        return Response(LikeSerializer(like, many=True).data)
    except:
        return Response({'status': 'failed'})