from user.models import User, Billing, Transferation
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializer import UserSerializer, BillingSerializer, TransferationSerializer
from django_filters import rest_framework as filters

# filter

class UserFilter(filters.FilterSet):
	
	class Meta:
		model = User
		fields = {
			'room_id' : ['iexact'],
			'customer_id' : ['iexact'],
			'customer_name' : ['icontains'],
		}

class BillingFilter(filters.FilterSet):

	class Meta:
		model = Billing
		fields = {
			'user__customer_id': ['iexact'],
			'user__room_id': ['iexact'],
			'user__customer_name': ['icontains'],
		}

# Viewset
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	permissions_classes = [
		permissions.AllowAny
	]
	serializer_class = UserSerializer
	filterset_class = UserFilter

class BillingViewSet(viewsets.ModelViewSet):
	queryset = Billing.objects.all()
	permissions_classes = [
		permissions.AllowAny
	]
	serializer_class = BillingSerializer
	filterset_class = BillingFilter

	# def create(self, request, *args, **kwargs):
	# 	try:
	# 		return super(BillingViewSet, self).create(request, *args, **kwargs)

class TransferationViewSet(viewsets.ModelViewSet):
	queryset = Transferation.objects.all()
	permissions_classes = [
		permissions.AllowAny
	]
	serializer_class = TransferationSerializer
