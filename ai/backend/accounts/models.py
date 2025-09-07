from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models

class StudentManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Student(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    objects = StudentManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

# Model for AI Basics Courses
class AICourse(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    content = models.TextField()
    def __str__(self):
        return self.title