from rest_framework import routers
from .api import UserViewSet, BillingViewSet, TransferationViewSet

router = routers.DefaultRouter()
router.register('api/user', UserViewSet)
router.register('api/billing', BillingViewSet)
router.register('api/transfer', TransferationViewSet)

urlpatterns = router.urls
