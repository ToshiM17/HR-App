from django.urls import path
from . import views

from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path('get_token/', view=views.ObtainExpiringAuthToken.as_view(), name="get_token_page"),
    path('get_users/', view=views.GetUsersView.as_view(), name="get_users_page"),
    path('create_user/', view=views.CreateUserView.as_view(), name="create_user_page"),
    path('edit_user/<int:pk>', view=views.EditUserView.as_view(), name="edit_user_page"),
    path('delete_user/<int:pk>', view=views.DeleteUserView.as_view(), name="delete_user_page"),
    path('test_token/', view=views.TestTokenView.as_view(), name="test_token_page"),
    path('delete_token/', view=views.DeleteTokenView.as_view(), name="delete_token_page"),
]
