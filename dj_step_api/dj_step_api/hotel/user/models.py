from django.db import models

# constant
WATER_PRICE_CONST = 1000
ELECTRICITY_PRICE_CONST = 3000
BIKE_PRICE_CONST = 100


# Create your models here.
class User(models.Model):
	customer_name = models.CharField(max_length = 200)
	customer_id = models.IntegerField(default = 0)
	customer_phone = models.IntegerField(default = 0)
	room_id = models.IntegerField(default = 0, primary_key=True)
	num_bike = models.IntegerField(default = 1)
	bike_id = models.IntegerField(default = 0)
	parking_card_id = models.IntegerField(default = 0)
	customer_deposit = models.IntegerField(default = 0)
	start_date = models.DateTimeField(auto_now_add = True)

	image_profile = models.FileField(null = True, blank=True)
	image_cmnd = models.FileField(default = 0, blank=True)

	def __str__(self):
		return self.customer_name

class Billing(models.Model):
	billing_id = models.AutoField(primary_key=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	date = models.DateTimeField(auto_now_add = True)
	water_start_num = models.IntegerField(default=0, editable=False)
	water_end_num = models.IntegerField(default=0)
	electricity_start_num = models.IntegerField(default=0, editable=False)
	electricity_end_num = models.IntegerField(default=0)
	surchage = models.IntegerField(default=0)
	# paid = models.BooleanField(default=False)

	class Meta:
		ordering = ['date']

	def get_latest_bill(self):
		bills = Billing.objects.all().filter(user__room_id=self.user.room_id)
		
		if len(bills) == 0: # there is no bill before
			return 0

		latest_bill = bills.latest('date')

		print('latest bill: ', latest_bill.date, latest_bill.water_end_num, latest_bill.electricity_end_num)

		return latest_bill
	
	def get_water_start_num(self):
		if self._state.adding:
			b = self.get_latest_bill()
			if b == 0:
				return 0
			return b.water_end_num

		return self.water_start_num


	
	def get_electricity_start_num(self):
		if self._state.adding:
			b = self.get_latest_bill()
			if b == 0:
				return 0
			return b.electricity_end_num
		
		return self.electricity_start_num

	def save(self, *args, **kwargs):
		b = self.get_latest_bill()

		if b == 0:
			self.water_start_num = 0
			self.electricity_start_num = 0
		else:
			self.water_start_num = b.water_end_num
			self.electricity_start_num = b.electricity_end_num

		super(Billing, self).save(*args, **kwargs)



	
	def get_water_price(self):
		return (self.water_end_num - self.water_start_num)*WATER_PRICE_CONST

	
	def get_electricity_price(self):
		return (self.electricity_end_num - self.electricity_start_num)*ELECTRICITY_PRICE_CONST


	def get_bike_price(self):
		return (self.user.num_bike) * BIKE_PRICE_CONST

	def get_total_price(self):
		return self.get_water_price() + self.get_electricity_price() + self.get_bike_price() + self.surchage

	