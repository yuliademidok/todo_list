from rest_framework import serializers

from todos_app.models import Todos


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', )

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )


class CreateTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', 'completed_at')

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )


class CompleteTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        read_only_fields = (
            'title',
            'description',
            'created_at',
            'completed_at',
            'priority'
        )
        exclude = ('user', 'priority')
