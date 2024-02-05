# API Documentation

## Contents

- [API Documentation](#api-documentation)
  - [How Authentication Works](#how-authentication-works)
  - [Authentication Related Endpoints](#authentication-related-endpoints)
    - [Sign Up](#sign-up)
    - [Sign Up with OAuth](#sign-up-with-oauth)
    - [Get User Auth Token](#get-user-auth-token)
    - [Get User Auth Token for OAuth Account](#get-user-auth-token-for-oauth-account)
    - [Get Auth Tokens with Refresh Token](#get-auth-tokens-with-refresh-token)
    - [Resend Verification Email](#resend-verification-email)
    - [Log Out](#log-out)
  - [Profile Page Related Endpoints](#profile-page-related-endpoints)
    - [Obtain Users List](#obtain-users-list)
    - [Obtain Personal Profile Details](#obtain-personal-profile-details)
    - [Delete User Account](#delete-user-account)
    - [Obtain Profile Details](#obtain-profile-details)
    - [Change Profile Details](#change-profile-details)
    - [Change Profile Password](#change-profile-password)
    - [Change Profile Email](#change-profile-email)
  - [Property Related Endpoints](#property-related-endpoints)
    - [Get Property List](#get-property-list)
    - [Get Property](#get-property)
    - [Filter Properties](#filter-properties)
    - [Get User's Favorite Properties](#get-users-favorite-properties)
    - [Add Property to User's Favorites](#add-property-to-users-favorites)
    - [Remove Property from User's Favorites](#remove-property-from-users-favorites)
    - [Request Ownership of a Property](#request-ownership-of-a-property)
    - [Verify Ownership of a Property](#verify-ownership-of-a-property)
    - [Add Property](#add-property)
    - [Get User Created Properties](#get-user-created-properties)
    - [Get User Owned Properties](#get-user-owned-properties)
    - [Transfer Ownership of a property](#transfer-ownership-of-a-property)
    - [Drop Ownership of a property](#drop-ownership-of-a-property)
    - [Update Property Details](#update-property-details)
    - [Upload Image to a property](#upload-image-to-a-property)
    - [Remove Image from a property](#remove-image-from-a-property)
    - [Mark Property as For Sale](#mark-property-as-for-sale)
    - [Unmark Property as For Sale](#unmark-property-as-for-sale)
    - [Get user recommended properties](#get-user-recommended-properties)

## How Authentication Works
**All** endpoints (except those marked as ***[Authentication Exempt]***) in this document will need the **Authorization header** to be set in the request. 

**Format:**
```Authorization: Bearer {INSERT_AUTH_TOKEN_HERE}```

**For Example:**
```Authorization: Bearer c12f9d54d502b1bf9e3dacf4ee73c39dfeb5aae2```

**Refer to the [Get User Auth Token endpoint](#get-user-auth-token) on how to retrieve a user's auth token.**

### Error Responses
In the event that the **Authorization header is not set in the request**, you will receive a **401 Unauthorized response** with the following json body:
```json 
{
    "detail": "Authentication credentials were not provided."
}
```

In the event that the **token in the request is invalid**, you will receive a **401 Unauthorized response** with the following json body:
```json 
{
    "detail": "Invalid token."
}
```

## Authentication Related Endpoints

### Sign Up
***[Authentication Exempt]***

Sign up the user using their first and last name, phone (optional), email and password.

---

**Request**

```POST /user/signup/standard```

**Request body**
JSON data with the fields **"first_name"**, **"last_name"**, **"email"** and **"password"** 
***(NOTE: the password value must be in plain text. DO NOT HASH!)***
***(NOTE: "phone_number" field is optional.)***

Example:
```json
{
    "first_name": "Ivan",
    "last_name":  "Bossman",
    "email": "example@example.org",
    "phone_number": "+447483923216",
    "password": "Password123"
}
```

---

Responses:
- **201**

**Example:**

Request: ```Correct request body.```

JSON response:
```json
{
    "token": {
        "access": "c5a3ac27bce9f3e1720aa24d00fd07a595a40b12",
        "refresh": "1d12d109fdbfc3066b11fbf55aa32b420d7c29c5ff6f4aa51519e5f6",
        "expires_in": 499159.752566
    },
    "user": {
        "id": 2,
        "first_name": "Tony",
        "last_name": "Bossman",
        "phone_number": "+447483923216",
        "email": "example@example.org",
        "is_verified": false,
        "is_active": true,
        "is_staff": false,
        "date_joined": "2022-02-25",
        "favorites": []
    }
}
```

- **400**

**Example**

Request: ```Request body missing 'first_name', 'last_name', 'email' and/or 'password' fields.```

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Bad request syntax or unsupported method"
    }
}
```

- **409**

**Example**

Request: ```Request body containing an 'email' that has already been used.```

JSON response:
```json
{
    "error": {
        "message": "Conflict",
        "description": "A user with the specified email already exists."
    }
}
```
- **500**

**Example**

Request: ```An unexpected condition that prevented the server from fulfilling the request.```

JSON response:
```json
{
    "error": {
        "message": "Internal Server Error",
        "description": "The server encountered an unexpected condition that prevented it from fulfilling the request."
    }
}
```

---

### Sign Up with OAuth
***[Authentication Exempt]***

Sign up the user using an OAuth provider.

---

**Request**

```POST /user/signup/oauth```

**Request body**
JSON data with the fields **"token"** and **"provider"** 
***(NOTE: Valid "provider" values: unsplash)***

Example:
```json
{
    "token": "893fhjsdhf82hskd1929fjfjds9dhj",
    "provider":  "unsplash"
}
```

---

Responses:
- **201**

**Example:**

Request: ```Correct request body and valid token for the provider.```

JSON response:
```json
{
    "token": {
        "access": "c5a3ac27bce9f3e1720aa24d00fd07a595a40b12",
        "refresh": "1d12d109fdbfc3066b11fbf55aa32b420d7c29c5ff6f4aa51519e5f6",
        "expires_in": 499159.752566
    },
    "user": {
        "id": 2,
        "first_name": "Tony",
        "last_name": "Bossman",
        "phone_number": "+447483923216",
        "email": "example@example.org",
        "is_verified": false,
        "is_active": true,
        "is_staff": false,
        "date_joined": "2022-02-25",
        "favorites": []
    }
}
```

- **400**

**Example**

Request: ```Request body missing 'token' and/or 'provider' fields.```

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Request body missing required fields."
    }
}
```

Request: ```'provider' field in request body holds an invalid value.```

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Invalid provider in request body."
    }
}
```

- **409**

**Example**

Request: ```Email associated with OAuth account has already been used.```

JSON response:
```json
{
    "error": {
        "message": "Conflict",
        "description": "User with that email already exists."
    }
}
```

- **500**

**Example**

Request: ```An unexpected condition that prevented the server from fulfilling the request.```

JSON response:
```json
{
    "error": {
        "message": "Internal Server Error",
        "description": "The server encountered an unexpected condition that prevented it from fulfilling the request."
    }
}
```

---

### Get User Auth Token
***[Authentication Exempt]***

Get a specific user's auth token using their email and password.

---

**Request:**

```POST /user/token/standard```

**Request body:**
JSON data with the fields **"email"** and **"password"** ***(NOTE: the password value must be in plain text. DO NOT HASH!)***

Example:
```json
{
    "email": "example@example.org",
    "password": "Password123"
}
```

---

Responses:
- **200**

**Example:**

Request: ```Correct email and password in request body```

JSON response:
```json
{
    "token": {
        "access": "c5a3ac27bce9f3e1720aa24d00fd07a595a40b12",
        "refresh": "1d12d109fdbfc3066b11fbf55aa32b420d7c29c5ff6f4aa51519e5f6",
        "expires_in": 499159.752566
    },
    "user": {
        "id": 2,
        "first_name": "Tony",
        "last_name": "Bossman",
        "phone_number": "+447483923216",
        "email": "example@example.org",
        "is_verified": true,
        "is_active": true,
        "is_staff": false,
        "date_joined": "2022-02-25",
        "favorites": []
    }
}
```

- **400**

**Example:**

Request: ```Request body missing 'email' and/or 'password' fields```

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Bad request syntax or unsupported method"
    }
}
```

- **401**

**Example:**

Request: ```Incorrect password in request body```

JSON response:
```json
{
    "error": {
        "message": "Unauthorized",
        "description": "No permission -- see authorization schemes"
    }
}
```

- **404**

**Example:**

Request: ```Incorrect email in request body```

JSON response:
```json
{
    "error": {
        "message": "Not Found",
        "description": "Nothing matches the given URI"
    }
}
```

- **409** (User with given email is not a standard user. Use OAuth token endpoint instead.)

---

### Get User Auth Token for OAuth Account
***[Authentication Exempt]***

Get a specific user's auth token using an OAuth provider.

---

**Request:**

```POST /user/token/oauth```

**Request body:**
JSON data with the fields **"token"** and **"provider"** 
***(NOTE: Valid "provider" values: unsplash)***

Example:
```json
{
    "token": "893fhjsdhf82hskd1929fjfjds9dhj",
    "provider":  "unsplash"
}
```

---

Responses:
- **200**

**Example:**

Request: ```Correct token and provider in request body```

JSON response:
```json
{
    "token": {
        "access": "c5a3ac27bce9f3e1720aa24d00fd07a595a40b12",
        "refresh": "1d12d109fdbfc3066b11fbf55aa32b420d7c29c5ff6f4aa51519e5f6",
        "expires_in": 499159.752566
    },
    "user": {
        "id": 2,
        "first_name": "Tony",
        "last_name": "Bossman",
        "phone_number": "+447483923216",
        "email": "example@example.org",
        "is_verified": false,
        "is_active": true,
        "is_staff": false,
        "date_joined": "2022-02-25",
        "favorites": []
    }
}
```

- **400**

**Example:**

Request: ```Request body missing 'token' and/or 'provider' fields```

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Request body missing required fields."
    }
}
```

- **404**

**Example:**

Request: ```User with OAuth account's email address not found.```

JSON response:
```json
{
    "error": {
        "message": "Not Found",
        "description": "User with email address example@example.org could not be found."
    }
}
```

- **500**

**Example:**

Request: ```Something went wrong server-side.```

JSON response:
```json
{
    "error": {
        "message": "Internal Server Error",
        "description": "Something went wrong with the OAuth provider."
    }
}
```

### Get Auth Tokens with Refresh Token
***[Authentication Exempt]***

Get a specific user's auth tokens using a refresh token.

---

**Request:**

```POST /user/token/refresh```

**Request body:**
JSON data with the fields **"token"**

Example:
```json
{
    "token": "1d10f5a55aa7c9c2aa63c8feceafb417ad168fb53552224a81362569",
}
```

---

Responses:
- **201**

**Example:**

Request: ```Valid refresh token in request body```

JSON response:
```json
{
    "token": {
        "access": "a683286fca5e8ed5ea0c0dc4ced7cb65954ffb6c",
        "refresh": "1d10f5a55aa7c9c2aa63c8feceafb417ad168fb53552224a81362569",
        "expires_in": 59.982246
    }
}
```

- **400**

- **401**

- **500**

---

### Resend Verification Email

Resend a verification link to the user email address to complete the registeration process.

---

**Request**

```POST /resend_verification_email/```


**Request body**

JSON data with the fields **"email"**

Example:
```json
{
    "email": "example@org.com"
}
```

Responses:
- **404** (User has not registered with the given email)
- **400**
- **200**
---

### Log Out
Logs out the user (using their access_token). This will reset the access_token for that user, making their old token invalid.

---

**Request**

```GET /user/logout```

---

Responses:
- **200**

---

## Profile Page Related Endpoints

### Obtain Personal Profile Details
Retrives the user's personal details.

---

**Request**

```GET /user/profile/```

---

Responses:
- **200**

**Example:**

Request: ```/user/profile/```

JSON response:
```json
{
    "id": 1,
    "first_name": "Ivan",
    "last_name": "Bossman",
    "phone_number": "+447307723854",
    "email": "admin@admin.org",
    "is_verified": true,
    "is_active": true,
    "is_staff": true,
    "date_joined": "2022-02-21",
    "favorites": [
        {
            "id": 5,
            "favorites": 1,
            "city": "pflugerville",
            "street_address": "15005 Donna Jane Loop",
            "zipcode": "78660",
            "latitude": 30.43736839294430000000,
            "longitude": -97.65686035156250000000,
            "has_garage": false,
            "has_cooling": true,
            "has_association": false,
            "has_heating": true,
            "num_of_bathrooms": 14,
            "num_of_bedrooms": 3,
            "num_of_stories": 3,
            "latest_sale_price": 239900.00,
            "num_price_changes": 2,
            "avg_school_rating": 1.66,
            "avg_school_size" : 150,
            "avg_school_distance" : 1.2,
            "median_students_per_teacher" : 120,
            "for_sale" : false,
            "latest_sale_year": 2018,
            "predicted_price" : 1000000,
            "added_at": "2018-11-10"
            "lot_size": 6708.00,
            "living_area": 2132.00,
            "type": "Single Family",
            "year_built": 2002,
            "tax_rate": 1.98,
            "is_verified": true,
            "creator": "admin@admin.org",
            "owner": null,
            "image_urls": ["URL1" , "URL2"]
        }
    ]
}
```

---

### Delete User Account
Deletes the user's account.

---

**Request**

```DELETE /user/profile/```

---

Respomses:
- **200**

---
### Obtain Users List
Retrives information for all verified users.

---
**Request**

```GET /users/```

---

Responses:
- **200**
**Example:**

Request: ```/users/```

JSON response:
```json
{
    "id": 1,
    "first_name": "Ivan",
    "last_name": "Bossman",
    "phone_number": "+447483923216",
    "email": "example@example.org",
    "is_verified": true,
    "is_active": true,
    "is_staff": false,
    "date_joined": "2022-02-25",
    "favorites": []
},
{
    "id": 2,
    "first_name": "Ryan",
    "last_name": "Gosling",
    "phone_number": "+447483923216",
    "email": "rayan@example.org",
    "is_verified": true,
    "is_active": true,
    "is_staff": false,
    "date_joined": "2021-02-12",
    "favorites": []
},
```

### Obtain Profile Details
Retrives information for the requested user.

---

**Request**

```GET /user/profile/{user_id}/```

---

Responses:
- **200**

**Example:**

Request: ```/user/profile/4/```

JSON response:
```json
{
    "id": 2,
    "first_name": "Ivan",
    "last_name": "Bossman",
    "phone_number": "+447483923216",
    "email": "example@example.org",
    "is_verified": true,
    "is_active": true,
    "is_staff": false,
    "date_joined": "2022-02-25",
    "favorites": []
}
```

- **400**

- **404**

---

### Change Profile Details
Changes the personal profiles' displayed details.

---

**Request**

```PATCH /user/profile/change/details/```

---

**Request body:**
Embodies the any fields that the user want to change.

```json
{
    "first_name": "Tony",
    "last_name":  "Bossman",
    "email": "example@example.org",
    "phone_number": "+447483923216"
}
```

---

Responses:
- **200**

**Example:**

Request: ```/user/profile/change/details/```

JSON response:
```json
{
    "id": 2,
    "first_name": "Tony",
    "last_name": "Bossman",
    "phone_number": "+447483923216",
    "email": "example@example.org",
    "is_verified": true,
    "is_active": true,
    "is_staff": false,
    "date_joined": "2022-02-25",
    "favorites": []
}
```

- **400**

---

### Change Profile Password
Changes the personal profiles' password.

---

**Request**

```PATCH /user/profile/change/password/```

---

**Requested Body**
Embodies the current user's password and the new password.

```json
{
    "current_password": "Password123",
    "new_password": "NewPassword123"
}
```
---

Responses:
- **200**

- **400**

- **401**

---

### Change Profile Email
Cahnges the personal profiles' email.

---

**Requested Body**

```json
{
    "email": "newEmail@example.org"
}
```
---

Responses:
- **200**

- **400**

---

## Property Related Endpoints

### Get Property List
Get a list of all available properties.

---

**Request:**

```GET /properties```

---

Responses:
- **200**

**Example:**

Request: ```/properties```

JSON response:
```json
[
    {
        "pk": 1,
        "city": "pflugerville",
        "street_address": "15005 Donna Jane Loop",
        "zipcode": "78660",
        "latitude": 30.43736839294430000000,
        "longitude": -97.65686035156250000000,
        "has_garage": false,
        "has_cooling": true,
        "has_association": false,
        "has_heating": true,
        "num_of_bathrooms": 14,
        "num_of_bedrooms": 3,
        "num_of_stories": 3,
        "latest_sale_price": 239900.00,
        "num_price_changes": 2,
        "avg_school_rating": 1.66,
        "avg_school_size" : 150,
        "avg_school_distance" : 1.2,
        "median_students_per_teacher" : 120,
        "for_sale" : false,
        "latest_sale_year": 2018,
        "predicted_price" : 1000000,
        "added_at": "2018-11-10",
        "lot_size": 6708.00,
        "living_area": 2132.00,
        "type": "Single Family",
        "year_built": 2002,
        "tax_rate": 1.98,
        "is_verified": true,
        "creator": "admin@admin.org",
        "owner": null,
        "image_urls": ["URL1" , "URL2"]
    },

    {
        "pk": 2,
        "city": "austin",
        "street_address": "1400 Donna Jane Loop",
        "zipcode": "78660",
        "latitude": 31.43736839294430000000,
        "longitude": -99.65686035156250000000,
        "has_garage": true,
        "has_cooling": true,
        "has_association": false,
        "has_heating": true,
        "num_of_bathrooms": 14,
        "num_of_bedrooms": 3,
        "num_of_stories": 3,
        "latest_sale_price": 239900.00,
        "num_price_changes": 2,
        "avg_school_rating": 1.66,
        "avg_school_size" : 150,
        "avg_school_distance" : 1.2,
        "median_students_per_teacher" : 120,
        "for_sale" : false,
        "latest_sale_year": 2018,
        "predicted_price" : 1000000,
        "added_at": "2018-11-10"
        "lot_size": 6000.00,
        "living_area": 2132.00,
        "type": "Apartment",
        "year_built": 2002,
        "tax_rate": 2.5,
        "is_verified": true,
        "creator": "admin@admin.org",
        "owner": null,
        "image_urls": ["URL1" , "URL2"]
    }
]
```

### Get Property

Get data related to a property.

---

**Request:**

```GET /property/{property_id}```

where *property_id* is an integer.

---

**Query parameters:**

**fields** [optional]

Only retrieves specific fields of the Property object.

The field names that can be queried are:

  1-  city <br/>
  2-  street_address <br/>
  3-  zipcode <br/>
  4-  latitude <br/>
  5-  longtitude <br/>
  6-  has_garage <br/>
  7-  has_cooling <br/>
  8-  has_heating <br/>
  9-  has_association <br/>
  10- num_of_bathrooms <br/>
  11- num_of_bedrooms <br/>
  12- num_of_stories <br/>
  13- type <br/>
  14- year_built <br/>
  15- latest_sale_price <br/>
  16- latest_sale_year <br/>
  17- num_price_changes <br/>
  18- tax_rate <br/>
  19- predicted_price <br/>
  20- lot_size <br/>
  21- living_area <br/>
  22- avg_school_rating <br/>
  23- avg_school_size <br/>
  24- avg_school_distance <br/>
  25- median_students_per_teacher <br/>
  26- creator <br/>
  27- owner <br/>
  28- for_sale <br/>
  29- is_verified <br/>
  30- added_at <br/>
  31- image_urls <br/>
  

Example: ```/property/1?fields=city,street_address,zipcode```

---

Responses:
- **200**

**Example:**

Request: ```/property/1```

JSON response:
```json
[ 
    {
        "pk": 1,
        "city": "pflugerville",
        "street_address": "15005 Donna Jane Loop",
        "zipcode": "78660",
        "latitude": 30.43736839294430000000,
        "longitude": -97.65686035156250000000,
        "has_garage": false,
        "has_cooling": true,
        "has_association": false,
        "has_heating": true,
        "num_of_bathrooms": 14,
        "num_of_bedrooms": 3,
        "num_of_stories": 3,
        "latest_sale_price": 239900.00,
        "num_price_changes": 2,
        "avg_school_rating": 1.66,
        "avg_school_size" : 150,
        "avg_school_distance" : 1.2,
        "median_students_per_teacher" : 120,
        "for_sale" : false,
        "latest_sale_year": 2018,
        "predicted_price" : 1000000,
        "added_at": "2018-11-10",
        "lot_size": 6708.00,
        "living_area": 2132.00,
        "type": "Single Family",
        "year_built": 2002,
        "tax_rate": 1.98,
        "is_verified": true,
        "creator": "admin@admin.org",
        "owner": null,
        "image_urls": ["URL1" , "URL2"]
    }
]
```

- **400**

**Example:**

Request: ```/property/1?fields=street_name``` (Property object exists but **street_name** is not a valid field)

JSON response:
```json
{
    "error": {
        "message": "Bad Request",
        "description": "Bad request syntax or unsupported method"
    }
}
```

- **404**

**Example:**

Request: ```/property/245``` (Property object with id 245 does not exist)

JSON response:
```json
{
    "error": {
        "message": "Not Found",
        "description": "Nothing matches the given URI"
    }
}
```
---

### Filter Properties

Get a narrowed down list of properties based on multiple paramaters supplied by the user.

---

**Request:**

```GET /custom_filter?paramter1_name=value&parameter2_name=value...&parameterN_name=value```

where:

 *paraameter_name* is the filter parameter. <br/>
 *value* is the value to apply on the parameter.

---

**Filtering Properties**

The filter paramters are:
  <br/>*has_garage* <br/>
  *has_cooling* <br/>
  *has_heating* <br/>
  *max_bedrooms* <br/>
  *min_bedrooms* <br/>
  *max_bathrooms* <br/>
  *min_bathrooms* <br/>
  *max_stories* <br/>
  *min_stories* <br/>
  *max_lot_size* <br/>
  *min_lot_size* <br/>
  *max_living_area* <br/>
  *min_living_area* <br/>
  *type* <br/>
  *distance_from_center* <br/>
  *age* <br/>

Note1: 
  The minimum and maximum parameters are inclusive [Min,Max]. 

Note2: 
  The distance from center is calculated in miles. Therefore the value that is specified for this 
  paramater essentaily means 'within' x miles. 

- **Example:**
```/custom_filter?distance_from_center=2```<br/>
  This will retrieve all properties that have a distance from the center that is within 2 miles.

Note3: 
  The age of a property represent (cuurent_year - year_built).

- **Example:**
```/custom_filter?age=4```<br/>
  This will retrieve all properties that have have an age of 4 years or less.


**Ordering Properties**

An ordering of the properties can be specified by the paramaters: <br/>
  *lot_size* <br/>
  *living_area* <br/>
  *latest_sale_year* <br/>
  *latest_sale_price* <br/>
  *year_built* <br/>

- **Examples:**

```/custom_filter?ordering=year_built```<br/>
  This will retrieve all properties ordered from oldest to newest.(Ascending)

```/custom_filter?ordering=-latest_sale_price```<br/>
  This will retrieve all properties ordered from highest price to lowest price. (Descending)

**Searching for Properties**

  ---using q Search--- <br/>
  Searching for a property can be achieved by specifiying keywords that realtes to any of these attributes: <br/>
    1- City -> Contains Match <br/>
    2- Zip Code -> Exact Match <br/>
    3- Street Address -> Contains Match <br/>

- **Examples:**

```/custom_filter?q=aust```<br/>
  This will retrieve all properties that contains the keyword 'aust' as part of the city name.

```/custom_filter?q=78733```<br/>
  This will retrieve all properties that are exact matches of the zipcode specified. 

---

Responses:
- **200**

**Example:**

Request: ```/custom_filter?q=aus&type=apartment&ordering=-yearbuilt```

JSON response:
```json
[ 
    {
      "pk": 1,
      "city": "austin",
      "street_address": "15005 Silmon Loop",
      "zipcode": "78660",
      "latitude": 33.43736839294430000000,
      "longitude": -97.65686035156250000000,
      "has_garage": false,
      "has_cooling": true,
      "has_association": false,
      "has_heating": true,
      "num_of_bathrooms": 14,
      "num_of_bedrooms": 3,
      "num_of_stories": 3,
      "latest_sale_price": 239900.00,
      "num_price_changes": 2,
      "avg_school_rating": 1.66,
      "avg_school_size" : 150,
      "avg_school_distance" : 1.2,
      "median_students_per_teacher" : 120,
      "for_sale" : false,
      "latest_sale_year": 2018,
      "predicted_price" : 1000000,
      "added_at": "2018-11-10",
      "lot_size": 6708.00,
      "living_area": 2132.00,
      "type": "Apartment",
      "year_built": 2017,
      "tax_rate": 1.98,
      "is_verified": true,
      "creator" : "admin@admin.org",
      "owner": null,
      "image_urls": ["URL1" , "URL2"]
  },
  
  
  {
    "pk": 2,
    "city": "austin",
    "street_address": "15005 Jane Loop",
    "zipcode": "78660",
    "latitude": 32.43736839294430000000,
    "longitude": -97.65686035156250000000,
    "has_garage": false,
    "has_cooling": true,
    "has_association": false,
    "has_heating": true,
    "num_of_bathrooms": 14,
    "num_of_bedrooms": 3,
    "num_of_stories": 3,
    "latest_sale_price": 239900.00,
    "num_price_changes": 2,
    "avg_school_rating": 1.66,
    "avg_school_size" : 150,
    "avg_school_distance" : 1.2,
    "median_students_per_teacher" : 120,
    "for_sale" : false,
    "latest_sale_year": 2018,
    "predicted_price" : 1000000,
    "added_at": "2018-11-10",
    "lot_size": 6708.00,
    "living_area": 2132.00,
    "type": "Apartment",
    "year_built": 1999,
    "tax_rate": 1.98,
    "is_verified": true,
    "creator" : "admin@admin.org",
    "owner" : null,
    "image_urls": ["URL1" , "URL2"]
},
  
  
]
```
---

### Get User's Favorite Properties

Retrieves the user's favorite properties.

---

**Request**

```GET /user/favorites/```

---

Responses:
- **200**

**Example:**

Request: ```/user/favorites/```

JSON response:
```json
{
    "favorites": [
        {
            "id": 1724,
            "favorites": 1,
            "city": "austin",
            "street_address": "6100 Chictora Cv",
            "zipcode": "78759",
            "latitude": 30.40229606628420000000,
            "longitude": -97.76898193359380000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "has_association": false,
            "num_of_bathrooms": 17,
            "num_of_bedrooms": 3,
            "num_of_stories": 4,
            "latest_sale_price": 565000.00,
            "num_price_changes": 2,
            "avg_school_rating": 1.66,
            "avg_school_size" : 150,
            "avg_school_distance" : 1.2,
            "median_students_per_teacher" : 120,
            "for_sale" : false,
            "predicted_price" : 1000000,
            "added_at": "2018-11-10",
            "lot_size": 6708.00,
            "living_area": 2132.00,
            "type": "Apartment",
            "year_built": 1999,
            "tax_rate": 1.98,
            "is_verified": true,
            "creator" : "admin@admin.org",
            "owner" : null,
            "image_urls": ["URL1" , "URL2"]
        },
        
        {
            "id": 1724,
            "favorites": 1,
            "city": "austin",
            "street_address": "6100 Chictora Cv",
            "zipcode": "78759",
            "latitude": 30.40229606628420000000,
            "longitude": -97.76898193359380000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "has_association": false,
            "num_of_bathrooms": 17,
            "num_of_bedrooms": 3,
            "num_of_stories": 4,
            "latest_sale_price": 565000.00,
            "num_price_changes": 2,
            "avg_school_rating": 1.66,
            "avg_school_size" : 150,
            "avg_school_distance" : 1.2,
            "median_students_per_teacher" : 120,
            "for_sale" : false,
            "predicted_price" : 1000000,
            "added_at": "2018-11-10",
            "lot_size": 6708.00,
            "living_area": 2132.00,
            "type": "Apartment",
            "year_built": 1999,
            "tax_rate": 1.98,
            "is_verified": true,
            "creator" : "admin@admin.org",
            "owner" : null,
            "image_urls": ["URL1" , "URL2"]
        }
        
    ]
}

```

- **500**

---

### Add Property to User's Favorites

Add a property to the user's favorites using a property_id.

---

**Request**

```POST /user/favorites/add/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5
}
```

---

Responses:

- **201**

- **400**

- **404** (Invalid property_id in request)

- **409** (User already has this property as a favorite)

- **432** (Property is unverified and cannot be favorited)

---

### Remove Property from User's Favorites

Remove a property from the user's favorites using a property_id.

---

**Request**

```POST /user/favorites/remove/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5
}
```

---

Responses:

- **200**

- **400**

- **404** (Invalid property_id in request)

---

### Request Ownership of a Property

Request ownership of a property using a property_id.

---

**Request**

```POST /property/request_ownership/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5
}
```

---

Responses:

- **201**

- **400**

- **404** (Invalid property_id in request)

- **409** (User has already requested ownership for this property)

- **419** (User is already the owner of this property)

---

### Verify Ownership of a Property

Verify ownership of a property using a verification_code.

---

**Request**

```POST /property/verify_ownership/```

**Request body**

JSON data with the fields **"verification_code"**

Example:
```json
{
    "verification_code": 123456
}
```

---

Responses:
- **200**

- **400**

- **403** (Verfication code not linked to requesting user)

- **404** (Verification code does not exist)

- **409** (Verfication code has expired)

---

### Add Property

Add a new property by a user.

---

**Request**

```POST /property/add/```

**Request body**

JSON data with with the minimum required fields that a user needs to enter:

**"city"**

**"zipcode"**

**"street_address"**

**"latitdue"**   

**"longitude"**

**"num_of_bedrooms"**

**"num_of_bathrooms"**

**"num_of_stories"**

**"has_garage"**

**"has_cooling"**

**"has_heating"**

**"has_association"**

**"type"** 

**"living_area"**

**"lot_size"**

**"latest_sale_price"**

**"latest_sale_year"**


***(NOTE: As agreed, "latitdue" and "longitude" fields will be populated by sending the user's current location)***

***(NOTE: other fileds needs to be manually entered for the property to be removed from pending and get approved)***


Example:
```json
  {
        "city": "austin",
        "zipcode": "78759",
        "street_address": "6100 Chictora Cv",
        "latitude": 30.40229606628420000000,
        "longitude": -97.76898193359380000000,
        "num_of_bathrooms": 17,
        "num_of_bedrooms": 3,
        "num_of_stories": 4,
        "has_garage": false,
        "has_cooling": true,
        "has_heating": true,
        "has_association": false,
        "type": "Apartment",
        "living_area": 2132.00,
        "lot_size": 6708.00,
        "latest_sale_price": 565000.00,
        "latest_sale_year": 2019,
    }
```

---

Responses:

- **201**

- **400**

---


### Get User Created Properties

Retireives a list of all properties created by a user.

---

**Request**

```GET /user_created_properties/```

Responses:

- **200**

**Example:**

Request: ```/user_created_properties/```

**If user has any properties created**


JSON response:
```json
  {
      "id": 1,
      "city": "austin",
      "street_address": "6100 Chictora Cv",
      "zipcode": "78759",
      "latitude": 30.40229606628420000000,
      "longitude": -97.76898193359380000000,
      "has_garage": false,
      "has_cooling": true,
      "has_heating": true,
      "has_association": false,
      "num_of_bathrooms": 17,
      "num_of_bedrooms": 3,
      "num_of_stories": 4,
      "latest_sale_price": 565000.00,
      "num_price_changes": 2,
      "avg_school_rating": 1.66,
      "avg_school_size" : 150,
      "avg_school_distance" : 1.2,
      "median_students_per_teacher" : 120,
      "for_sale" : false,
      "predicted_price" : 1000000,
      "added_at": "2018-11-10",
      "lot_size": 6708.00,
      "living_area": 2132.00,
      "type": "Apartment",
      "year_built": 1999,
      "tax_rate": 1.98,
      "is_verified": true,
      "creator" : "admin@admin.org",
      "owner" : null,
      "image_urls": ["URL1" , "URL2"]
  }
```

**If user does not have any properties created**

JSON response:
[]

### Get User Owned Properties

Retireives a list of all properties owned by a user.

---

**Request**

```GET user/user_owned_properties/```

Responses:

- **200**

**Example:**

Request: ```user/user_owned_properties/```

**If user has any properties that they own.**

JSON response:
```json
[
    {
        "favorites": 0,
        "city": "austin",
        "street_address": "4406 Island Cv",
        "zipcode": "78731",
        "latitude": 30.32925987243650000000,
        "longitude": -97.77833557128910000000,
        "has_garage": false,
        "has_cooling": true,
        "has_heating": true,
        "has_association": false,
        "num_of_bathrooms": 16,
        "num_of_bedrooms": 8,
        "num_of_stories": 5,
        "latest_sale_price": 6499000.00,
        "latest_sale_year": 2018,
        "num_price_changes": 2,
        "lot_size": 48787.20,
        "living_area": 7904.00,
        "avg_school_rating": 7.00,
        "avg_school_size": 1177.00,
        "avg_school_distance": 2.23,
        "median_students_per_teacher": 16,
        "type": "Single Family",
        "year_built": 2001,
        "tax_rate": 1.98,
        "added_at": "2022-03-15",
        "images_urls": ["URL1", "URL2"],
        "creator": null,
        "owner": "user@example.org"
    },
    {
        "favorites": 0,
        "city": "austin",
        "street_address": "809 Marly Way",
        "zipcode": "78733",
        "latitude": 30.32828140258790000000,
        "longitude": -97.85839080810550000000,
        "has_garage": true,
        "has_cooling": true,
        "has_heating": true,
        "num_of_bathrooms": 14,
        "num_of_bedrooms": 7,
        "num_of_stories": 5,
        "latest_sale_price": 3500000.00,
        "latest_sale_year": 2019,
        "num_price_changes": 7,
        "lot_size": 45302.40,
        "living_area": 5650.00,
        "avg_school_rating": 8.00,
        "avg_school_size": 1373.00,
        "avg_school_distance": 3.43,
        "median_students_per_teacher": 14,
        "type": "Single Family",
        "year_built": 2017,
        "tax_rate": 1.98,
        "added_at": "2022-03-15",
        "is_verified": true,
        "image_urls": ["URL1", "URL2"],
        "creator": null,
        "owner": "user@example.org"
    }
]
```
**If user does not have any properties created**

JSON response:
[]

### Transfer Ownership of a property

Transfer ownership from the current owner to another user.

---

**Request**

```POST /property/transfer_ownership/```

**Request body**

JSON data with the fields
**"property_id"**

**"user_email"**

Example:
```json
{
    "property_id": 5,
    "email": "kevin.hardson@gmail.com"
}
```

Responses:
- **200**

- **400**

- **409** (User has already requested ownership for this property)

- **403** (The user does not own the property)

- **404** (Invalid property id/user email in request)

---

### Drop Ownership of a property

Drop the user's ownership of a property.

---


**Request**

```POST /property/drop_ownership/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5,
}
```

Responses:
- **200**

- **400**

- **403** (The user does not own the property)

- **404** (Invalid property id in request)


### Upload Image to a property

Upload images to a speicifc property.

---

**Request**

```POST property/upload_image/```

**Request body**

JSON data with the fields:

**"property_id"** 

**"images"** : array of base64 image strings.

Example:

Property with 1 image.

```json
{
    "property_id": 1,
    "images": ["base64_string1", "base64_string2"]
}
```

**Responses**

- **201** 

Includes a json response of the updated image URLs for a property


Example:
```json
{
   "image_urls": ["URL1", "URL2", "URL3"]
}
```

- **400**

- **433** (The upload limit has been reached)

- **403** (The user is not authorized to upload images to the property)

- **404** (Invalid property id in request)

---

### Remove Image from a property

Remove images from a speicifc property.

---

**Request**

```POST property/remove_image/```

**Request body**

JSON data with the fields:

**"property_id"** 

**"images"** : array of image URLs.

Example:

Property with 3 images.

```json
{
    "property_id": 1,
    "images": ["URL1", "URL2"]
}
```

Responses:

- **200** 

Includes a json response of the updated image URLs for a property
Example:
```json
{
   "image_urls": ["URL3"]
}
```

- **400**

- **403** (The user is not authorized to remove images from the property)

- **404** (Invalid property id in request)

---

### Mark Property as For Sale

Mark the owner's property as for sale.

---

**Request body**

JSON data with the fields to be updated.

**Request**

```POST /property/mark_for_sale/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5,

}
```

Responses: 

- **200**

- **400**

- **403** (The user does not own the property)

- **404** (Invalid property id in request)

- **432** (Property is unverified and cannot be marked as for sale)

---

### Unmark Property as For Sale

Unmark the owner's property as for sale.

---

```POST /property/unmark_for_sale/```

**Request body**

JSON data with the fields **"property_id"**

Example:
```json
{
    "property_id": 5,

}
```

Responses: 

- **200**

- **400**

- **403** (The user does not own the property)

- **404** (Invalid property id in request)


### Get user recommended properties

Retrieve a list of all the properties recommended to user.

---

**Request**

```GET /user/recommendations/```

**Request body**

```json
    "recommendations": [
        {
            "id": 6020,
            "favorites": 0,
            "city": "austin",
            "street_address": "3608 Rip Ford Dr",
            "zipcode": "78732",
            "latitude": 30.37550735473630000000,
            "longitude": -97.88845825195310000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "num_of_bathrooms": 17,
            "num_of_bedrooms": 2,
            "num_of_stories": 3,
            "latest_sale_price": 250000.00,
            "latest_sale_year": 2019,
            "num_price_changes": 6,
            "lot_size": 8276.00,
            "living_area": 2000.00,
            "avg_school_rating":8.33,
            "avg_school_size": 1476.00,
            "avg_school_distance": 1.90,
            "median_students_per_teacher": 17,
            "type": "Single Family",
            "year_built": 1989,
            "tax_rate": 1.98,
            "added_at": "2022-03-16",
            "is_verified": true,
            "image_urls": ["URL1", "URL2"],
            "owner": null,
            "creator": null
        },
        {
            "id": 3341,
            "favorites": 0,
            "city": "austin",
            "street_address": "8015 Bon Air Dr",
            "zipcode": "78757",
            "latitude": 30.35554313659670000000,
            "longitude": -97.72284698486330000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "num_of_bathrooms": 14,
            "num_of_bedrooms": 2,
            "num_of_stories": 3,
            "latest_sale_price": 400000.00,
            "latest_sale_year": 2019,
            "num_price_changes": 1,
            "lot_size": "7927.00",
            "living_area": 1654.00,
            "avg_school_rating": 4.00,
            "avg_school_size": 1019.00,
            "avg_school_distance": 0.63,
            "median_students_per_teacher": 14,
            "type": "Single Family",
            "year_built": 1967,
            "tax_rate": 1.98,
            "added_at": "2022-03-16",
            "is_verified": true,
            "image_urls": ["URL1", "URL2"],
            "creator": null,
            "owner": null
        },
        {
            "id": 8061,
            "favorites": 0,
            "city": "austin",
            "street_address": "8903 Perch Cv",
            "zipcode": "78717",
            "latitude": 30.50415611267090000000,
            "longitude": -97.74227142333980000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "num_of_bathrooms": 16,
            "num_of_bedrooms": 2,
            "num_of_stories": 3,
            "latest_sale_price": 300000.00,
            "latest_sale_year": 2018,
            "num_price_changes": 1,
            "lot_size": 7840.00,
            "living_area": 1916.00,
            "avg_school_rating": 7.67,
            "avg_school_size": 1785.00,
            "avg_school_distance": 1.40,
            "median_students_per_teacher": 16,
            "type": "Single Family",
            "year_built": 1992,
            "tax_rate": 2.21,
            "added_at": "2022-03-16",
            "is_verified": true,
            "image_urls": ["URL1", "URL2"],
            "creator": null,
            "owner": null,
        },
        {
            "id": 9769,
            "favorites": 0,
            "city": "austin",
            "street_address": "3110 Govalle Ave",
            "zipcode": "78702",
            "latitude": 30.26633071899410000000,
            "longitude": -97.70246124267580000000,
            "has_garage": true,
            "has_cooling": true,
            "has_heating": true,
            "num_of_bathrooms": 14,
            "num_of_bedrooms": 2,
            "num_of_stories": 3,
            "latest_sale_price": 350000.00,
            "latest_sale_year": 2018,
            "num_price_changes": 4,
            "lot_size": 11325.60,
            "living_area": 1218.00,
            "avg_school_rating": 5.33,
            "avg_school_size": 679.00,
            "avg_school_distance": 1.00,
            "median_students_per_teacher": 14,
            "type": "Single Family",
            "year_built": 1940,
            "tax_rate": 1.98,
            "added_at": "2022-03-16",
            "is_verified": true,
            "image_urls": ["URL1", "URL2"],
            "creator": null,
            "owner": null,

        },
        {
            "id": 12820,
            "favorites": 0,
            "city": "austin",
            "street_address": "5919 Magee Bnd",
            "zipcode": "78749",
            "latitude": 30.21111488342290000000,
            "longitude": -97.87310791015620000000,
            "has_garage": false,
            "has_cooling": true,
            "has_heating": true,
            "num_of_bathrooms": 17,
            "num_of_bedrooms": 2,
            "num_of_stories": 3,
            "latest_sale_price": 425000.00,
            "latest_sale_year": 2019,
            "num_price_changes": 4,
            "lot_size": 9583.00,
            "living_area": 2067.00,
            "avg_school_rating": 8.00,
            "avg_school_size": 1655.00,
            "avg_school_distance": 1.47,
            "median_students_per_teacher": 17,
            "type": "Single Family",
            "year_built": 1998,
            "tax_rate": 1.98,
            "added_at": "2022-03-16",
            "is_verified": true,
            "image_urls": ["URL1", "URL2"],
            "creator": null,
            "owner": null,

        }
    ]

```
---

Responses:

- **201**

### Update Property Details

Update the property's details.

---

**Request**

```PATCH /property/update/details/<int:property_id>/```
**Request body**
JSON data with the fields to be updated.
Example:
```json
{
    "has_garage": true, 
    "has_cooling": false,
    "has_heating": true,
    "num_of_bathrooms": 4,
    "num_of_bedrooms": 5,
    "num_of_stories": 3,
    "type": "Single Family",
    "latest_sale_price": 1000,
    "latest_sale_year": 2010,
    "num_price_changes": 1234,
    "tax_rate": 0.06,
    "lot_size": 1000,
    "living_area": 600,
    "avg_school_rating": 5,
    "avg_school_size": 5000,
    "avg_school_distance": 500,
    "median_students_per_teacher": 6,
}
```

Responses:
- **200**

- **400**

- **403** (The user does not own the property)

- **404** (Invalid property id in request)
