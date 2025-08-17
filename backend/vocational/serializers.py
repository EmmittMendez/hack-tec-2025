from rest_framework import serializers
from .models import VocationalTest, VocationalAnswer


class VocationalAnswerSerializer(serializers.ModelSerializer):
    """
    Serializer para las respuestas de tests vocacionales
    """
    class Meta:
        model = VocationalAnswer
        fields = ['id', 'pregunta', 'respuesta']


class VocationalTestSerializer(serializers.ModelSerializer):
    """
    Serializer para los tests vocacionales
    """
    answers = VocationalAnswerSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = VocationalTest
        fields = ['id', 'user', 'user_name', 'fecha', 'resultado', 'puntaje', 'answers']
        read_only_fields = ['user', 'fecha']


class VocationalTestCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear tests vocacionales con respuestas
    """
    answers = VocationalAnswerSerializer(many=True)
    
    class Meta:
        model = VocationalTest
        fields = ['resultado', 'puntaje', 'answers']
    
    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        user = self.context['request'].user
        test = VocationalTest.objects.create(user=user, **validated_data)
        
        for answer_data in answers_data:
            VocationalAnswer.objects.create(test=test, **answer_data)
        
        return test


class VocationalTestListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar tests vocacionales
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    answers_count = serializers.IntegerField(source='answers.count', read_only=True)
    
    class Meta:
        model = VocationalTest
        fields = ['id', 'user_name', 'fecha', 'resultado', 'puntaje', 'answers_count']
