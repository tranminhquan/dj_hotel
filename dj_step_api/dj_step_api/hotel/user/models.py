from django.db import models
from datetime import datetime

# constant
WATER_PRICE_CONST = 1000
ELECTRICITY_PRICE_CONST = 3000
BIKE_PRICE_CONST = 100

def get_latest_bill(room_id):
	bills = Billing.objects.all().filter(user__room_id=room_id)
		
	if len(bills) == 0: # there is no bill before
		return 0

	latest_bill = bills.latest('date')

	print('latest bill: ', latest_bill.date, latest_bill.water_end_num, latest_bill.electricity_end_num)

	return latest_bill

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
	start_date = models.DateTimeField()

	image_profile = models.FileField(null = True, blank=True)
	image_cmnd = models.FileField(default = 0, blank=True)

	def __str__(self):
		return self.customer_name

# class Room(models.Model):
# 	room_id = models.IntegerField(primary_key=True)
# 	user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#     )

# 	def __str__(self):
# 		return self.room_id

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
	
	def get_water_start_num(self):
		if self._state.adding:
			b = get_latest_bill(self.user.room_id)
			if b == 0:
				return 0
			return b.water_end_num

		return self.water_start_num
	
	def get_electricity_start_num(self):
		if self._state.adding:
			b = get_latest_bill(self.user.room_id)
			if b == 0:
				return 0
			return b.electricity_end_num
		
		return self.electricity_start_num

	def save(self, *args, **kwargs):
		b = get_latest_bill(self.user.room_id)

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

class Transferation(models.Model):
	old_room_id = models.IntegerField()
	new_room_id = models.IntegerField()
	start_date = models.DateTimeField()
	surchage = models.IntegerField(default=0)
	nb_days = models.IntegerField(editable=False)
	water_debt = models.IntegerField(editable=False)
	electricity_debt = models.IntegerField(editable=False)
	total_debt = models.IntegerField(editable=False)

	# get living days in the old room
	def get_days(self):
		b = get_latest_bill(self.old_room_id)

		if b == 0: # if no bill found
			# get start_date from User
			existed_room = User.objects.filter(room_id=self.old_room_id)
			if len(existed_room) == 0:
				return 0
			else:
				period = self.start_date - (existed_room[0].start_date)
				return period.days
		else:
			period = self.start_date - b.date
			return period.days

	def save(self, *args, **kwargs):
		# Modified in User model, e.g, 
		# update room_id, start_date
		existed_room = User.objects.filter(room_id=self.new_room_id)
		
		if len(existed_room) == 0:
			self.nb_days = self.get_days()
			print('nb days: ', self.nb_days)
			self.water_debt = self.get_water_debt()
			self.electricity_debt = self.get_electricity_debt()
			self.total_debt = self.get_total_debt()

			super(Transferation, self).save(*args, **kwargs)

			delete_record = User.objects.filter(room_id=self.old_room_id)
			changed_user = delete_record[0]
			delete_record[0].delete()
			changed_user.room_id = self.new_room_id
			changed_user.start_date = self.start_date
			changed_user.save()

			
		else:
			raise("Room is rented by another user")


	def get_water_debt(self):
		return self.nb_days * WATER_PRICE_CONST

	def get_electricity_debt(self):
		return self.nb_days * ELECTRICITY_PRICE_CONST

	# def get_bike_debt(self):
	# 	return self.get_days() * BIKE_PRICE_CONST

	def get_total_debt(self):
		return self.get_water_debt() + self.get_electricity_debt() + self.surchage