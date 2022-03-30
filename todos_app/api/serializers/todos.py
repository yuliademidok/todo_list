from rest_framework import serializers

from ...models import Todos


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', )

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )
