from django.db import models

# Create your models here.
class User(models.Model):
  username = models.CharField(max_length=20)
  password = models.CharField(max_length=15)

class Review(models.Model):
  review = models.CharField(max_length=220)
  bar_id = models.CharField(max_length=200)
  user = models.CharField(max_length=20)
