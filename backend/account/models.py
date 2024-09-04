from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



class UserAccountManager(BaseUserManager):

    def create_user(self, name, email, phone, password=None):
        if not email:
            raise ValueError("User must have an email")
        
        if not phone:
            raise ValueError("User  must have a phone number")
        
        email = self.normalize_email(email)
        email = email.lower()
        user = self.model(name=name, email=email, phone=phone)

        user.set_password(password)
        user.save(using=self._db)

        return user
    

    def create_superuser(self, name, email, phone, password=None):
        user = self.create_user(name, email, phone, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user




class UserAccount(AbstractBaseUser, PermissionsMixin):

    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=25, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    objects = UserAccountManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['name', 'email']

    def __str__(self) -> str:
        return self.name
