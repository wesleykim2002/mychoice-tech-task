from django.shortcuts import render
from rest_framework import viewsets
from .models import Items
from rest_framework.response import Response
from .serializers import ItemsSerializer

from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

# Create your views here.
class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer

    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data)
            except IntegrityError:
                return Response(
                    {"detail": "Item with this name already exists in this group."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
