from rest_framework import serializers
from user.models import User, Billing
import datetime

# constant
WATER_PRICE_CONST = 1000
ELECTRICITY_PRICE_CONST = 3000
BIKE_PRICE_CONST = 100

# User serializers

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class BillingSerializer(serializers.ModelSerializer):
	water_price = serializers.ReadOnlyField(source='get_water_price')
	electricity_price = serializers.ReadOnlyField(source='get_electricity_price')
	bike_price = serializers.ReadOnlyField(source='get_bike_price')
	total_price = serializers.ReadOnlyField(source='get_total_price')

	class Meta:	
		model = Billing
		fields = '__all__'


	# def cal_water_price(self, instance):
	# 	return (instance.water_end_num - instance.water_start_num) * WATER_PRICE_CONST

	# def cal_electricity_price(self, instance):
	# 	return (instance.electricity_end_num - instance.electricity_start_num) * ELECTRICITY_PRICE_CONST

	# def cal_bike_price(self, instance):
	# 	return (instance.user.num_bike) * BIKE_PRICE_CONST

	# def cal_total_price(self, instance):
	# 	return self.cal_water_price(instance) + \
	# 			self.cal_electricity_price(instance) + \
	# 			self.cal_bike_price(instance) + \
	# 			instance.surchage



	


	
		
 