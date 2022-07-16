import imp
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