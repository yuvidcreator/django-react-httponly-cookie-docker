from django.test import TestCase

# Create your tests here.




# UNIQUE ID for any model Instance

# import datetime
# import uuid
# from datetime import datetime

# from django.db import models
# from django.utils import timezone
# from django.utils.crypto import get_random_string


# class TimeStampModel(models.Model):
#     id = models.CharField(max_length=256, primary_key=True, editable=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         # managed = True
#         abstract = True

#     def save(self, *args, **kwargs):
#         if not self.id:
#             self.id = datetime.now().strftime("%d%m%Y%H%M%S%f") + get_random_string(
#                 length=5, allowed_chars="0123456789"
#             )
#         super(TimeStampModel, self).save(*args, **kwargs)