from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# from .forms import CrawlForm
# Create your views here.


def index(request):
    return render(request, 'barcrawl/index.html', {})

def bars(request):
    return render(request, 'barcrawl/bars.html', 
    {
      'radius': request.POST.get('radius'),
      'numBars': request.POST.get('numBars'),
      'price': request.POST.get('price')
    })