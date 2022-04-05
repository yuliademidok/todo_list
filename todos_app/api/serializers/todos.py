from rest_framework import serializers

from todos_app.models import Todos


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', )
        read_only_fields = ('completed_at', )

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )

    def validate(self, data):
        if data['parent_id'] and \
                data['parent_id'] not in Todos.objects.filter(user=data['user'].id, parent_id__isnull=True):
            raise serializers.ValidationError('Invalid id')
        return data

    subtasks = serializers.SerializerMethodField()

    def get_subtasks(self, instance) -> list:
        return Todos.objects.filter(parent_id=instance.id).values()


class CompleteTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        read_only_fields = (
            'title',
            'description',
            'created_at',
            'completed_at',
            'priority',
            'parent_id'
        )
        exclude = ('user', )
