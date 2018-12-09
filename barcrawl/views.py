from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
#from django.middleware.csrf.CsrfViewMiddleware import *
# Create your views here.
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid(): 
            user = form.save()
            #log the user in
            login(request,user)
            return HttpResponseRedirect("/barcrawlapp/")
            #return redirect('') #barcrawl:index
    else:
        form = UserCreationForm()
    return render(request, 'barcrawl/signup.html', {'form':form})

@login_required
def index(request):
    return render(request, 'barcrawl/index.html', {})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
        #log in the user
            user = form.get_user()
            login(request, user)
            return HttpResponseRedirect("/barcrawlapp/")
    else:
        form = AuthenticationForm()
    return render(request, 'barcrawl/login.html', {'form':form})

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return HttpResponseRedirect("/barcrawlapp/login/")

''' Code for possible future view "Reviews". Use this view for any
     additional webpages that need the user to be logged in to view.
@login_required(login_url='/barcrawl/login/')
def index(request):
    return render(request, 'barcrawl/index.html', {})
'''
