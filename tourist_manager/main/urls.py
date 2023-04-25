from rest_framework import routers
from .api import VehicleViewSet, TouristViewSet, LogDetailsViewSet, SimpleVehicleViewSet, RatesViewSet
from accounts.api import UserViewSet


from django.urls import path, include
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/vehicle', VehicleViewSet, 'vehicle')
router.register('api/tourist', TouristViewSet, 'tourist')
router.register('api/simplevehicle', SimpleVehicleViewSet, 'simplevehicle')
router.register('api/userlist', UserViewSet, 'userlist')
router.register('api/rates', RatesViewSet, 'rates')
#router.register('api/logdetails', LogDetailsViewSet, 'logdetails')

urlpatterns = router.urls