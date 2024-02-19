from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from django.urls import path, include
from .views import TaskViewSet

router = routers.DefaultRouter()

routes = router.register(r'tasks/', TaskViewSet, 'tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API'))
]