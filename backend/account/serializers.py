from djoser.serializers import UserCreateSerializer
from account.models import UserAccount


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ['name', 'email', 'phone', 'password', 'created_at']