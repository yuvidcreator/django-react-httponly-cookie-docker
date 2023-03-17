import datetime
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

from apps.common.models import TimeStampModel
# from coreAPI.dependancies import path_and_rename

from .manager import CustomUserManager


class User(AbstractBaseUser, TimeStampModel, PermissionsMixin):
    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    )
    username = None
    email = models.EmailField(_("Email address"), unique=True)
    mobile_regex = RegexValidator(
        regex=r'^\d{9,10}$', 
        message="Phone number must be entered in the format: '9999999999'. Up to 10 digits allowed."
    )
    mobile = models.CharField(
        validators=[mobile_regex],
        max_length=10,
        verbose_name=_("Mobile No"),
        unique=True,
        null=True,
        blank=True,
    )
    first_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Last Name"))
    gender = models.CharField(max_length=8, choices=GENDER_CHOICES, default="Male", blank=True, verbose_name=_("Gender"))
    profile_picture = models.ImageField(
        default="default.jpg", upload_to="profile_pics", blank=True, null=True, verbose_name=_("Profile Picture")
    )
    date_of_birth = models.DateField(blank=True, null=True, verbose_name=_("Date of Birth"))
    address_line_1 = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Address 1"))
    address_line_2 = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Address 2"))
    city = models.CharField(max_length=255, null=True, blank=True, verbose_name=_("City"))

    is_blocked = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_mobile_verified = models.BooleanField(default=False, verbose_name=_("Mobile Verified"))
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def _str_(self):
        return self.email

    # def save(self, *args, **kwargs):
    #     if not self.id:
    #         self.first_name, self.last_name = self.name.split(" ")
    #     super(User, self).save(*args, **kwargs)

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        db_table = "users"  # Table Name

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True




class OTP(models.Model):
    """
    For validation of OTP with expiration of each transaction
    """

    txn_id = models.UUIDField(
        primary_key=True, editable=False, default=uuid.uuid4
    )  # for each taransaction it a uniuq id
    email_or_mobile = models.TextField(
        default=""
    )  # user can provide email or mobile number
    otp = models.CharField(max_length=10)  # OTP
    expire_at = models.DateTimeField()  # OTP expiration time (current time + timedelta)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = "otp"  # Table Name

    def save(self, *args, **kwargs):
        self.otp = get_random_string(settings.OTP["OTP_DIGIT_LENGTH"], "1234567890")
        self.expire_at = timezone.now() + settings.OTP["OTP_EXPIRATION_TIME"]
        super(OTP, self).save(*args, **kwargs)

    @property
    def is_expired(self):
        exp_time = self.expire_at - timezone.now()
        if exp_time < datetime.timedelta(seconds=0):
            return True
        return False


class PasswordResetToken(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "passwordresettokens"  # Table Name


# class Contact(TimeStampModel):
#     """
#     For payout to owner and venya client, we have to create contact id
#     """

#     razorpay_contact_id = models.CharField(max_length=30)
#     user = models.OneToOneField(
#         User, on_delete=models.CASCADE, related_name="razorpay_contact"
#     )

#     class Meta:
#         db_table = "contacts"  # Table Name


# class FundAccount(TimeStampModel):
# user
# account_type
# bank_account(For Bank) (Recomonded)
# vpa (for UPI)

# name
# ifsc
# account_number
# razor_pay_contact_id
# active

# after creation fund account we have to store from razorpay fund response
# razorpay_fund_account_id
# bank_name     # HHDFC
