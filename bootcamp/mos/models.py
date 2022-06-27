from django.db import models

# Create your models here.
class Mos(models.Model):
    #병과 모델(군사특기) Military Occupational Specialty
    gsteukgiCd = models.CharField(max_length=20) # 군사특기코드
    gsteukgiNm = models.CharField(max_length=200)
    gunGbcd = models.IntegerField(default=0)