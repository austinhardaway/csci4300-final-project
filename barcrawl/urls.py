from django.urls import path
from . import views

app_name = 'barcrawl'

urlpatterns = [
    path('', views.index, name='index'),
    path('bar', views.bars, name='bars'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
