from django.urls import path
from . import views

urlpatterns = [
    path('get_users/', view=views.get_users.as_view(), name="get_users_page"),
]
