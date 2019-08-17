from rest_framework import routers
from .api import UserViewSet, BillingViewSet

router = routers.DefaultRouter()
router.register('api/user', UserViewSet)
router.register('api/billing', BillingViewSet)

urlpatterns = router.urls
