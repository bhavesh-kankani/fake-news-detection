from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer, ProfileSerializer

@api_view(["POST"])
def signup(request):
    print(request.data)
    data = {
        "email": request.data.get("email", None).lower(),
        "password": request.data.get("password", None),
        "first_name": request.data.get("firstName", None),
        "last_name": request.data.get("lastName", None),
        "preferences": request.data.get("preferences", None),
    }
    serializer = CustomUserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        if user is not None:
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getProfile(request):
    user = request.user
    serializer = ProfileSerializer(user)
    data = serializer.data
    data["preferences"] = serializer.data["preferences"].split(',')
    return Response(data, status=status.HTTP_200_OK)
