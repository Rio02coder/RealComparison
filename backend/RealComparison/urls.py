"""RealComparison URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from core import views 


urlpatterns = [
    path('admin/', admin.site.urls),
    ###################################
    path('users/', views.GetUserListView.as_view(), name="users"),
    path('user/signup/standard/', views.SignUpView.as_view(), name="sign_up"),
    path('user/token/standard/', views.UserAuthTokenView.as_view(), name="user_auth_token"),
    path('user/signup/oauth/', views.OAuthSignUpView.as_view(), name="oauth_sign_up"),
    path('user/token/oauth/', views.OAuthUserTokenView.as_view(), name="oauth_user_token"),
    path('user/token/refresh/', views.RefreshTokenView.as_view(), name="refresh_user_token"),
    path('user/logout/', views.LogOutView.as_view(), name="log_out"),
    path('user/profile/', views.GetPersonalUserDetailsViews.as_view(), name='user_personal_profile'),
    path('user/profile/<int:user_id>/', views.GetUserDetailsView.as_view(), name='user_details'),
    path('user/profile/update/details/', views.UpdateUserDetailsView.as_view(), name='update_user_details'),
    path('user/profile/change/password/', views.ChangeUserPasswordView.as_view(), name='change_user_password'),
    path('user/profile/change/email/', views.ChangeUserEmailView.as_view(), name='change_user_email'),
    path('user/favorites/', views.UserFavoritesView.as_view(), name="user_favorites"),
    path('user/favorites/add/', views.AddFavoritePropertyView.as_view(), name="add_user_favorites"),
    path('user/favorites/remove/', views.RemoveFavoritePropertyView.as_view(), name="remove_user_favorites"),
    path('user/user_added_properties/', views.UserAddedPropertiesView.as_view(), name="user_added_properties"),
    path('user/user_owned_properties/', views.UserOwnedPropertiesView.as_view(), name='user_owned_properties'),
    path('user/recommendations/', views.RecommenderPropertyView.as_view(), name="user_recommendations"),
    ###################################
    path('properties/', views.PropertyListView.as_view(), name="properties"),
    path('property/<int:property_id>/', views.PropertyDetailView.as_view(), name="property"),
    path('property/request_ownership/', views.RequestOwnershipView.as_view(), name="request_ownership"),
    path('property/verify_ownership/', views.VerifyOwnershipView.as_view(), name="verify_ownership"),
    path('property/add/', views.AddPropertyView.as_view(), name="add_property"),
    path('property/transfer_ownership/', views.TransferOwnershipView.as_view(), name="transfer_ownership"),
    path('property/drop_ownership/', views.DropOwnershipView.as_view(), name="drop_ownership"),
    path('property/upload_image/', views.UploadPropertyImageView.as_view(), name="upload_image"),
    path('property/remove_image/', views.RemovePropertyImageView.as_view(), name="remove_image"),
    path('property/mark_for_sale/', views.MarkPropertyForSaleView.as_view(), name="mark_property_for_sale"),
    path('property/unmark_for_sale/', views.UnmarkPropertyForSaleView.as_view(), name="unmark_property_for_sale"),
    path('property/update/details/<int:property_id>', views.UpdatePropertyDetailsView.as_view(), name='update_property_details'),
    ###################################
    path('custom_filter/', views.PropertyFilterView.as_view(), name="custom_filter"),
    ###################################
    path('verify_email/<uid>/<token>/', views.VerifyUserEmail.as_view(), name="verify_email"),
    path('resend_verification_email/', views.ResendVerificationEmail.as_view(), name="resend_verification_email"),
]
