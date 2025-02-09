from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

router = DefaultRouter()
router.register('', TeamMemberViewSet, basename='members')

urlpatterns = router.urls