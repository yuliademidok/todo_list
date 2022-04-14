from rest_framework import serializers

from todos_app.models import Todos


class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', )
        read_only_fields = ('completed_at', )

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )

    def validate(self, data):
        try:
            user_id = self.instance.user.id
        except AttributeError:
            user_id =data['user'].id
        if data.get('parent_id', None) not in Todos.objects.filter(user=user_id, parent_id__isnull=True):
            raise serializers.ValidationError('Invalid parent id')
        return data


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        exclude = ('user', 'parent_id', )
        read_only_fields = ('completed_at', )

    publisher_user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        source='user'
    )

    # subtasks = serializers.SerializerMethodField()
    subtasks = SubtaskSerializer(many=True, read_only=True)

    # def get_subtasks(self, instance) -> list:
    #     return Todos.objects.filter(parent_id=instance.id).values()


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


