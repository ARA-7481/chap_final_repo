from main.models import Vehicle, Tourist, LogDetails
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import VehicleSerializer, TouristSerializer, LogDetailsSerializer
from rest_framework import filters
from django.forms.models import model_to_dict

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = VehicleSerializer

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_newformat = serializer.data
        passengers = response_newformat.pop('passengers', None)
        driver_info = response_newformat.pop('drivers', None)
        passenger_info_array = []
        for passenger_uid in passengers:
            passenger = Tourist.objects.get(pk=passenger_uid)
            passenger_info_array.append(model_to_dict(passenger))
        driver = Tourist.objects.get(pk=driver_info)
        driver_details = model_to_dict(driver)
        response_newformat.update({'drivers':driver_details, 'passengers':passenger_info_array})
        return Response(response_newformat)


    def list(self, request, *args, **kwargs):
        queryset = Vehicle.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        response = []
        for data_set in serializer.data:
            response_newformat = data_set
            passengers = response_newformat.pop('passengers', None)
            driver_info = response_newformat.pop('drivers', None)
            passenger_info_array = []
            for passenger_uid in passengers:
                passenger = Tourist.objects.get(pk=passenger_uid)
                passenger_info_array.append(model_to_dict(passenger))
            driver = Tourist.objects.get(pk=driver_info)
            driver_details = model_to_dict(driver)
            response_newformat.update({'drivers':driver_details, 'passengers':passenger_info_array})
            response.append(response_newformat)
        return Response(response)


    def create(self, request, *args, **kwargs):
        try:
            if 'passenger_count' in request.data:
                passenger_count = request.data['passenger_count']
            else:
                return Response(status=200,data={
                    "message": "Bad request, failed to add an item",
                    "error_details":"Passenger count missing!",
                })
            if 'passengers' in request.data:
                passengers_data = request.data.pop('passengers', None)
            else:
                passengers_data = []
            if 'drivers' in request.data:
                driver_data = request.data.pop('drivers', None)
            else:
                driver_data = {}
            passenger_array = []
            passenger_info_array = []
            if len(passengers_data) > passenger_count:
                return Response(status=200,data={
                    "message": "Bad request, failed to add an item",
                    "error_details":"Passenger array exceeds passenger count",
                })
            else:
                for passenger_data in passengers_data:
                    passenger_count -= 1
                    passenger_data.update({'added_by':self.request.user})
                    passenger = Tourist.objects.create(**passenger_data)
                    passenger.save()
                    passenger_array.append(passenger.unique_id)
                    passenger_info_array.append(model_to_dict(passenger))
                while passenger_count != 0:
                    null_data = ({'added_by':self.request.user})
                    passenger = Tourist.objects.create(**null_data)
                    passenger.save()
                    passenger_count -= 1
                    passenger_array.append(passenger.unique_id)
                    passenger_info_array.append(model_to_dict(passenger))
                driver_data.update({'added_by':self.request.user})
                driver = Tourist.objects.create(**driver_data)
                driver.save()
                driver_uid = driver.unique_id
                driver_info = model_to_dict(driver)
                request.data.update({'drivers':driver_uid, 'passengers':passenger_array})
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                serializer.save(added_by=self.request.user)
                response_newformat = serializer.data
                response_newformat.pop('passengers', None)
                response_newformat.pop('drivers', None)
                response_newformat.update({'drivers':driver_info, 'passengers':passenger_info_array})
                return Response(response_newformat)
        except:
            raw_error = serializer.errors
            error_array = []
            for error in raw_error:
                error_array.append(error)
            return Response(status=200,data={
                    "message": "Bad request, failed to add an item",
                    "error_details": "Missing fields",
                    "fields":error_array,
                })


class TouristViewSet(viewsets.ModelViewSet):
    queryset = Tourist.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TouristSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name','date','time']
    ordering_fields = '__all__'
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

class SimpleVehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = VehicleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['=plate_number','date','time']
    ordering_fields = '__all__'
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LogDetailsSerializer

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

