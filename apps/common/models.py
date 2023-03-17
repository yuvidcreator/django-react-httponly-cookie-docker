import datetime
# import uuid
from datetime import datetime

from django.db import models
# from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.utils.crypto import get_random_string
from django.core.validators import RegexValidator

# Create your models here.


# class TimeStampUUIDModel(models.Model):
#     pkid = models.BigAutoField(primary_key=True, editable=False)
#     id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         abstract = True



class TimeStampModel(models.Model):
    id = models.CharField(max_length=256, primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # managed = True
        abstract = True

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = datetime.now().strftime("%d%m%Y%H%M%S%f") + get_random_string(
                length=5, allowed_chars="0123456789"
            )
        super(TimeStampModel, self).save(*args, **kwargs)



class Enquiry(TimeStampModel):
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    email = models.EmailField(verbose_name=_("Email address"))
    mobile_regex = RegexValidator(
        regex=r'^\d{9,10}$', 
        message="Phone number must be entered in the format: '9999999999'. Up to 10 digits allowed."
    )
    mobile = models.CharField(
        validators=[mobile_regex],
        max_length=10,
        verbose_name=_("Mobile No")
    )
    message = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Message"))

    def _str_(self):
        return self.email

    class Meta:
        verbose_name = _("Enquiry")
        verbose_name_plural = _("Enquiries")
        db_table = "enquiries"  # Table Name