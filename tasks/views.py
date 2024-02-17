from .models import Task
from rest_framework import viewsets, permissions
from .serializer import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [permissions.AllowAny]