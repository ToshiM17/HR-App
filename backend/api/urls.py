from django.urls import path
from . import views

from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path('get_token/', view=auth_views.obtain_auth_token, name="get_token_page"),
    path('get_users/', view=views.GetUsersView.as_view(), name="get_users_page"),
    path('test_token/', view=views.TestTokenView.as_view(), name="test_token_page"),
]
