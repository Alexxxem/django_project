from django.db import models


class Manufacturer(models.Model):
    name = models.CharField(primary_key=True, max_length=100)
