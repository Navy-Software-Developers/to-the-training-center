from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Mos(models.Model):
    #병과 모델(군사특기) Military Occupational Specialty
    code = models.CharField(max_length=20) # gsteukgiCd 군사특기코드 
    name = models.CharField(max_length=200) # gsteukgiNm
    branch = models.IntegerField(default=0) # 육해공 코드 #1육군 2해군 3공군 4 해병
    currentWiki = models.ForeignKey('Wiki', on_delete=models.SET_NULL, null=True, related_name='current_Wiki_doc')

    def __str__(self) -> str:
        return f"[{self.get_branch_name()}] {self.code} {self.name}"
    
    def get_branch_name(self) -> str:
        BRANCH = ['', '육군', '해군', '공군', '해병대']
        return BRANCH[self.branch]


class Recurit(models.Model):
    # 모집병 군지원 접수현황
    mos = models.ForeignKey(Mos, on_delete=models.CASCADE) # 모집 병과
    recuritYear = models.IntegerField() # mojipYy 모집년도
    recuritRound = models.IntegerField() # mojipTms 모집회차
    enlistMilitaryUnit = models.CharField(max_length=150) # iybudaeCdm 입영부대명
    recuritCnt = models.IntegerField() # seonbalPcnt 선발인원수
    applyedCnt = models.IntegerField() # jeopsuPcnt 접수인원수
    recuritStart = models.IntegerField() # jeopsuSjdtm 접수시작일자
    recuritEnd = models.IntegerField() # jeopsuJrdtm 접수종료일자
    enlistStart = models.IntegerField() # iyyjsijakYm 입영시작월
    enlistEnd = models.IntegerField() # iyyjjongryoYm 입영종료월

    def __str__(self) -> str:
        return f"[{self.mos}] {self.applyedCnt/self.recuritCnt}"


class Wiki(models.Model):
    mos = models.ForeignKey(Mos, on_delete=models.CASCADE) # 위키 병과
    content = models.TextField() # 본문
    modifier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    modified = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"[{self.mos}] {self.content[:20]}..."


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mos = models.ForeignKey(Mos, on_delete=models.CASCADE) # 관심보직
    notification = models.BooleanField(default=True) # 알림설정

    def __str__(self) -> str:
        return f"{self.user} {self.mos} {self.notification}"

    def get_mos_name(self) -> str:
        return self.mos.name


class Point(models.Model):
    category = models.CharField(max_length=150) # gubun 구분 예 자격 전공 등
    name = models.CharField(max_length=150, unique=True) # 항목명 정보처리기사 등
    level = models.CharField(max_length=150, null=True) # jgmyeonheoDg 자격면허등급

    def __str__(self) -> str:
        return f"{self.get_count_from_MMA()} {self.category} {self.name} {self.level}"
    
    def get_count_from_MMA(self) -> int:
        return MMAPoint.objects.filter(point=self).count()
    
    def get_count_from_user(self) -> int:
        return UserPoint.objects.filter(point=self).count()

class MosPoint(models.Model):
    mos = models.ForeignKey(Mos, on_delete=models.CASCADE) # 병과
    point = models.ForeignKey(Point, on_delete=models.CASCADE) # 점수항목
    direct = models.BooleanField() # 직간접

    def __str__(self) -> str:
        return f"{self.mos} {self.point} {self.direct}"


class UserPoint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    point = models.ForeignKey(Point, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user} {self.point}"


class MMAPoint(models.Model):
    uid = models.CharField(max_length=300)
    point = models.ForeignKey(Point, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.uid} {self.point}"


class MosReview(models.Model):
    mos = models.ForeignKey(Mos, on_delete=models.CASCADE) # 병과
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating1 = models.IntegerField() #당직양
    rating2 = models.IntegerField() #업무량
    rating3 = models.IntegerField() #복지
    rating4 = models.IntegerField() #
    rating5 = models.IntegerField()
    review = models.TextField()
    advantage = models.TextField()
    disadvantage = models.TextField()
    modified = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"[{self.mos}] {self.user} {self.rating1}{self.rating2}{self.rating3}{self.rating4}{self.rating5}{self.review}"
    
    def get_username(self) -> str:
        return self.user.username