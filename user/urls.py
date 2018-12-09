from django.urls import path
from . import views
#from django.contrib.auth.views import login                                                               

urlpatterns = [
   path('', views.signup_view, name='signup'),                                                           
   # path('', views.index, name='index')
]
