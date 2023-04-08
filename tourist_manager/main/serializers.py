from rest_framework import serializers
from main.models import Vehicle, Tourist, LogDetails


class LogDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogDetails
        fields = '__all__'

class TouristSerializer(serializers.ModelSerializer):
    time = serializers.TimeField(format="%I:%M %p", required=False)
    class Meta:
        model = Tourist
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    time = serializers.TimeField(format="%I:%M %p", required=False)
    class Meta:
        model = Vehicle
        fields = '__all__'

