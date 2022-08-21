from django.shortcuts import render, get_object_or_404
from django.forms.models import model_to_dict
from django.db.models import Count
from django.core.cache import cache
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
    mos_list = cache.get('mos_list')
    if not mos_list:
        serializer = MosSerializer(Mos.objects.all(), many=True)
        mos_list = serializer.data
        cache.set('mos_list', mos_list, 60*30)

    return Response(mos_list)


@api_view(['GET'])
def search(request, query):
    serializer = MosSerializer(Mos.objects.filter(name__contains=query), many=True)
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
    mps = MosPoint.objects.filter(mos=ob)
    #result['points'] = [dict({'direct': mp.direct}, **model_to_dict(mp.point)) for mp in mps]

    result['point_direct_major_mma'] = 0
    result['point_direct_major_user'] = 0
    result['point_indirect_major_mma'] = 0
    result['point_indirect_major_user'] = 0
    result['points'] = []

    for mp in mps:
        point = model_to_dict(mp.point)
        point['direct'] = mp.direct
        point['point_mma'] = MMAPoint.objects.filter(point = mp.point).count()
        point['point_user'] = UserPoint.objects.filter(point = mp.point).count()
        if mp.point.category == '전공':
            if mp.direct:
                result['point_direct_major_mma'] += point['point_mma']
                result['point_direct_major_user'] += point['point_user']
            else:
                result['point_indirect_major_mma'] += point['point_mma']
                result['point_indirect_major_user'] += point['point_user']



        result['points'].append(point)
    
    mma_total = cache.get('mma_total')
    if not mma_total:
        # mma_total = MMAPoint.objects.values('uid').annotate(total=Count('point')).count() 69761자격증이 없는 사람은 포함이 안되서 api가져오는 부분 수정 필요
        mma_total = 79891
        cache.set('mma_total', mma_total)
    
    user_like_total = cache.get('user_like_total')
    if not user_like_total:
        user_like_total = Like.objects.filter(mos=ob).count()
        cache.set('user_like_total', user_like_total, 30)
    
    result['mma_total'] = mma_total
    result['user_total'] = user_like_total


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
                branch = int(item['gunGbcd']),
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


@api_view(['GET'])
def update_point(request):
    # BRANCH = ['', '육군', '해군', '공군', '해병대']
    BRANCH = {'육군': 1, '해군': 2, '공군': 3, '해병':4}
    # MMA_OPENAIP_0015 모집병 지원가능분야 조회_v7.0_영문

    url = 'http://apis.data.go.kr/1300000/mjbJiWon/list'
    numOfRows = 1000
    total = numOfRows
    i = 1

    while i <= total//numOfRows:
        params ={'serviceKey' : serviceKey, 'numOfRows' : str(numOfRows), 'pageNo' : str(i) }
        response = requests.get(url, params=params)
        xml_parse = xmltodict.parse(response.content.decode('utf-8'))
        xml_dict = json.loads(json.dumps(xml_parse))
        items = xml_dict['response']['body']['items']['item']

        for item in items:
            try:
                mos, created = Mos.objects.get_or_create(
                    branch = BRANCH[item['gtcdNm1']],
                    code = item['gsteukgiCd'],
                    defaults={'name': item['gsteukgiNm']})
                print(mos, created)

                defaults={'category': item['gubun']}
                if item['jgmyeonheoDg'] is not None:
                    defaults['level'] = item['jgmyeonheoDg']

                point, created = Point.objects.get_or_create(
                    name = item['gtcdNm2'],
                    defaults = defaults)
                print(point, created)

                obj, created = MosPoint.objects.get_or_create(
                    mos = mos,
                    point = point,
                    direct = True if item['jjganjeopGbcd'] == '직접' else False)
                print(obj, created)
            except:
                print("찾을수없음", item)

        if i == 1:
            total = int(xml_dict['response']['body']['totalCount'])
        i += 1

    return Response({'status': 'success'})


@api_view(['GET'])
def update_mmapoint(request):
    # BRANCH = ['', '육군', '해군', '공군', '해병대']
    BRANCH = {'육군': 1, '해군': 2, '공군': 3, '해병':4}
    # MMA_OPENAPI_0018+병역대상자+지역별+자격현황+정보_v2.0_영문

    url = 'http://apis.data.go.kr/1300000/UmjJagyeok/list'
    numOfRows = 10000
    total = numOfRows
    i = 1

    while i <= total//numOfRows:
        params ={'serviceKey' : serviceKey, 'numOfRows' : str(numOfRows), 'pageNo' : str(i) }
        response = requests.get(url, params=params)
        xml_parse = xmltodict.parse(response.content.decode('utf-8'))
        xml_dict = json.loads(json.dumps(xml_parse))
        items = xml_dict['response']['body']['items']['item']

        for item in items:
            print(Point.objects.filter(name=item['jagyeokNm1']))
            # try:
            this_uid = f"{item['rnum']} {item['birth']} {item['sggjusoCd']} {item['sggjusoNm']}"
            j = 1
            while True:
                try:
                    obj, created = MMAPoint.objects.get_or_create(
                        uid = this_uid,
                        point = Point.objects.get(name=item['jagyeokNm'+str(j)])
                        )
                    print(obj, created)

                    j += 1
                except:
                    break
            # except:
            #     print("찾을수없음", item)

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
        # try:
        new = Wiki.objects.create(mos=mos, content=request.data.get("content"), modifier=request.user)
        mos.currentWiki = new
        mos.save()

        return Response({'status': 'success'})
        # except:
        #     return Response({'status': 'failed'})


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def like(request, pk):
    try:
        mos = Mos.objects.get(pk=pk)
    except Mos.DoesNotExist:
        return Response({'status': 'failed'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        try:
            like = Like.objects.get(mos=mos, user=request.user)
            return Response({'status': 'success', 'result': LikeSerializer(like).data})
        except Like.DoesNotExist:
            return Response({'status': 'success', 'result': 'notLike'})
        except:
            return Response({'status': 'failed'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST': # 관심추가
        Like.objects.create(mos=mos, user=request.user)

        return Response({'status': 'success'})

    elif request.method == 'PUT': # 알림 상태 변경
        try:
            Like.objects.get(mos=mos, user=request.user).notification = bool(request.POST['notification'])

            return Response({'status': 'success'})
        except:
            return Response({'status': 'failed'})

    elif request.method == 'DELETE': # 관심삭제
        try:
            Like.objects.get(mos=mos, user=request.user).delete()

            return Response({'status': 'success'})
        except:
            return Response({'status': 'failed'})



@api_view(['GET'])
def mylikes(request):
    try:
        print(request.user)
        like = Like.objects.filter(user=request.user)
        return Response(LikeSerializer(like, many=True).data)
    except:
        return Response({'status': 'failed'})


@api_view(['GET'])
def points(request):
    points = cache.get('points')
    if not points:
        serializer = PointSerializer(Point.objects.all(), many=True)
        points = serializer.data
        cache.set('points', points, 999999999999999999)

    mma_total = cache.get('mma_total')
    if not mma_total:
        # mma_total = MMAPoint.objects.values('uid').annotate(total=Count('point')).count() 69761자격증이 없는 사람은 포함이 안되서 api가져오는 부분 수정 필요
        mma_total = 79891
        cache.set('mma_total', mma_total)
    
    user_total = cache.get('user_total')
    if not user_total:
        user_total = User.objects.all().count()
        cache.set('user_total', user_total, 30)

    result = dict()
    result['points'] = points
    result['mma_total'] = mma_total
    result['user_total'] = user_total
    return Response(result)


@api_view(['GET'])
def mypoints(request):
    try:
        ups = UserPoint.objects.filter(user=request.user)
        result = []
        for i in ups:
            result.append(PointSerializer(i.point).data)

        return Response(result)
    except:
        return Response({'status': 'failed'})



@api_view(['POST', 'DELETE'])
def point(request, pk):
    try:
        try:
            point = Point.objects.get(pk=pk)
        except Point.DoesNotExist:
            return Response({'status': 'failed'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'POST': # 배점항목 추가
            UserPoint.objects.get_or_create(point=point, user=request.user)

            return Response({'status': 'success'})

        elif request.method == 'DELETE': # 배점항목 삭제
            UserPoint.objects.get(point=point, user=request.user).delete()

            return Response({'status': 'success'})
    except:
        return Response({'status': 'failed'})



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def review(request, pk):
    try:
        try:
            mos = Mos.objects.get(pk=pk)
        except Mos.DoesNotExist:
            return Response({'status': 'failed'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET': # 해당보직 리뷰 가져오기
            review = MosReview.objects.filter(mos=mos)
            return Response({'status': 'success', 'result': MosReviewSerializer(review, many=True).data})
            
        elif request.method == 'POST' or request.method == 'PUT': # 해당보직 리뷰 작성, 수정
            review = MosReview.objects.get_or_create(mos=mos, user=request.user)
            review.rating1 = request.data.get("rating1")
            review.rating2 = request.data.get("rating2")
            review.rating3 = request.data.get("rating3")
            review.rating4 = request.data.get("rating4")
            review.rating5 = request.data.get("rating5")
            review.review = request.data.get("review")
            review.advantage = request.data.get("advantage")
            review.disadvantage = request.data.get("disadvantage")
            review.save()

            return Response({'status': 'success'})
            
        elif request.method == 'DELETE': # 리뷰 삭제
            MosReview.objects.get(mos=mos, user=request.user).delete()

            return Response({'status': 'success'})
    except:
        return Response({'status': 'failed'})
