from rest_framework import serializers
from django.conf import settings
# from django.contrib.auth import get_user_model
from apps.accounts.models import User
from apps.accounts.utils import password_validation, validate_email


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "mobile", "password", "password2")
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True}
        }

    def save(self):
        if validate_email(self.validated_data["email"]):
            user = User(
                email=self.validated_data["email"],
                first_name=self.validated_data["first_name"],
                last_name=self.validated_data["last_name"],
                mobile=self.validated_data["mobile"],
                is_active=True
            )

            password = self.validated_data["password"]
            password2 = self.validated_data["password2"]

            if password != password2:
                raise serializers.ValidationError(
                    {"password": "Passwords do not match!"})
            
            if password_validation(password):
                user.set_password(password)
                user.save()

            return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", 
            "first_name", 
            "last_name", 
            "email", 
            "mobile",
            "gender",
            "profile_picture",
            "date_of_birth",
            "address_line_1",
            "address_line_2",
            "city",
            "is_blocked",
            "is_active",
            "is_mobile_verified"
        ]
