from rest_framework import generics
from django.views.generic.base import TemplateView
from online_shop.models import Product, Category, Manufacturer
from .serializers import ProductSerializer, CategorySerializer, ManufacturerSerializer

from django.http import JsonResponse
from django.db.models import Min, Max


class IndexView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = Product.objects.all()
        context['categories'] = Category.objects.all()
        context['manufacturers'] = Manufacturer.objects.all()
        context['min_price'] = Product.objects.aggregate(Min('price'))['price__min']
        context['max_price'] = Product.objects.aggregate(Max('price'))['price__max']
        return context


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        price_min = self.request.GET.get('price_min')
        price_max = self.request.GET.get('price_max')
        category = self.request.GET.get('category')
        manufacturer = self.request.GET.get('manufacturer')
        sort_by = self.request.GET.get('sort_by')
        sort_order = self.request.GET.get('sort_order')

        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
        if category:
            queryset = queryset.filter(category__name=category)
        if manufacturer:
            queryset = queryset.filter(manufacturer__name=manufacturer)

        return queryset


class ProductRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ManufacturerList(generics.ListCreateAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
