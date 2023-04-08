from rest_framework import generics, permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Profile
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer
from .permissions import IsOfficeAdmin

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = AuthToken.objects.create(user)[1]
            return Response(status=200,data={
                "message": "Success",
                "error_details":None,
                "token": token,
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
            })
        else:
            raw_error = serializer.errors
            #print(raw_error)
            empty_fields = []
            unique_fields = []
            for error in raw_error:
                content = raw_error.get(error,)
                if content[0] == "This field may not be blank." :
                    empty_fields.append(error)
                elif content[0] == "A user with that username already exists.":
                    unique_fields.append(error)
            return Response(status=200,data={
                "message": "Failed to register",
                "error_details": "System detected field errors",
                "empty_fields": empty_fields,
                "needs_unique_input": unique_fields,
                "token": None,
                "user": None
            })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            return Response(status=200, data={
                "message": "Success",
                "token": AuthToken.objects.create(user)[1],
                "user": UserSerializer(user, context=self.get_serializer_context()).data
            })
        else:
            return Response(status=200, data={
                "message": "Invalid Credentials",
                "token": None,
                "user": None
            })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        IsOfficeAdmin
    ]
    serializer_class = UserSerializer