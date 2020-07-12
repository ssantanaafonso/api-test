# api-test

This project is meant to be a REST API to manage customer data for a small shop. It will work as the backend side for a CRM interface. This API should be only accesible for registered users who will be able to manage customers and other users (this last one only if they have admin role)

There is two types of endpoints: 
* [Customer endpoints](#customer)
* [User endpoints](#user)

<a name="customer"></a>
## Customers endpoints

Users can manage customers info with the following actions:
* [Create new customers](#createc)
* [List all customers](#listc)
* [Get a customer](#getc)
* [Edit customer info](#editc)
* [Delete a customer](#deletec)
* [Add customer's profile photo](#profile)

<a name="createc"></a>
### Create new customer

Creates a new customer

* **URL**

  /customers

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  * name [String] (required)
  * surname [String] (required)
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5f05993be36388464c2f355a",
      "name": "name",
      "surname": "surname",
      "photo": "none",
      "createdBy": "user",
      "modifiedBy": "user",
      "lastModified": "date",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`

* **Sample Call:**

  ```
    curl --location --request POST 'host/customers' \
      --header 'Authorization: XXXXXXXXX' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "name": "name",
        "surname": "surname"
      }'
  ```
<a name="listc"></a>
### List all customers

Returns a list of all existing customers

* **URL**

  /customers

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5213a8i12332",
      "name": "name",
      "surname": "surname",
      "photo": "none",
      "createdBy": "user",
      "modifiedBy": "user",
      "lastModified": "date",
      "__v": 0
    },
    {
      "_id": "5213a8i132121",
      "name": "name2",
      "surname": "surname2",
      "photo": "none",
      "createdBy": "user",
      "modifiedBy": "user",
      "lastModified": "date",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`

* **Sample Call:**

  ```
    curl --location --request GET 'host/customers' \
    --header 'Authorization: XXXXXXXXX'
  ```
<a name="getc"></a>
### Get a customer

Returns customer info searching it by id

* **URL**

  /customers/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**

  None
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5213a8i12332",
      "name": "name",
      "surname": "surname",
      "photo": "none",
      "createdBy": "user",
      "modifiedBy": "user",
      "lastModified": "date",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`

* **Sample Call:**

  ```
    curl --location --request GET 'host/customers/5213a8i12332' \
    --header 'Authorization: XXXXXXXXX'
  ```
<a name="editc"></a> 
### Edit customer

Update customer info by id

* **URL**

  /customers/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**

  * name [String] (required)
  * surname [String] (required)
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5213a8i12332",
      "name": "changedName",
      "surname": "changedSurname",
      "photo": "none",
      "createdBy": "user",
      "modifiedBy": "user",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`

* **Sample Call:**

  ```
    curl --location --request PUT 'host/customers/5213a8i12332' \
    --header 'Authorization: Basic c2VyZ2lvQHlvbWlzbW8uY29tOm1pY29udHJhc2XDsWFzaW5jaWZyYXI=' \
    --header 'Authorization: XXXXXXXXX' \
    --data-raw '{
       "name": "changedName",
       "surname": "changedSurname"
    }'   
  ```
<a name="deletec"></a>
### Delete customer

Remove customer by id

* **URL**

  /customers/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**<br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { Customer **customer.name** removed }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`

* **Sample Call:**

  ```
    curl --location --request DELETE 'host/customers/5213a8i12332' \
    --header 'Authorization: XXXXXXXXX' \
    
  ```
<a name="profile"></a>  
### Add customer profile picture

Add a profile photo for a certain customer. If the customer already have one it will be replaced by the new one.

* **URL**

  /customers/:id/profilePic

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**<br />
  customerImage [File]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5213a8i12332",
      "name": "changedName",
      "surname": "changedSurname",
      "photo": "uploads/xxxxxxxxx.png",
      "createdBy": "user",
      "modifiedBy": "user",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ An image should be attached }`
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ Wrong mimetype, only jpeg or png files accepted }`

* **Sample Call:**

  ```
    curl --location --request PUT 'host/customers/5213a8i12332/profilePic' \
    --header 'Authorization: XXXXXXXXX' \
    --form 'customerImage=@/path/to/file'
  ```
<a name="user"></a>
## Users endpoints

Admin users can manage others users info with the following actions:
* [Create new users](#createu)
* [List all users](#listu)
* [Get a user](#getu)
* [Edit user info](#editu)
* [Delete a user](#deleteu)

<a name="createu"></a>
### Create new user

Creates a new user

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  * name [String] (required)
  * email [String] (required)
  * password [String] (required)
  * role [String] (required)
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5fc86cf35a8",
      "name": "name",
      "email": "user@domain",
      "password": "$2b$10$NOaOM02rDhWddQbkD7axlOAeME/Vzw.5uYQylhS3cnRnbSJPu1Y4K",
      "role": "user",
      "__v": 0
    } 
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Email already exists }`

* **Sample Call:**

  ```
    curl --location --request POST 'host/users' \
    --header 'Authorization: XXXXXXXXX' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "name",
        "password": "password",
        "email": "user@domain",
        "role": "user"
    }'
    
  ```
<a name="listu"></a>
### List all users

Returns a list of all existing users

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5fc86cf35a8",
      "name": "name",
      "email": "user@domain",
      "password": "XXXXXXXXX",
      "role": "user",
      "__v": 0
    },
    {
      "_id": "cf5fc86a8",
      "name": "othername",
      "email": "otheruser@domain",
      "password": "XXXXXXXXX",
      "role": "admin",
      "__v": 0
    } 
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`

* **Sample Call:**

  ```
    curl --location --request GET 'host/users' \
    --header 'Authorization: XXXXXXXXX'
  ```
<a name="getu"></a>  
### Get a user

Returns user info searching it by id

* **URL**

  /users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**

  None
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5fc86cf35a8",
      "name": "name",
      "email": "user@domain",
      "password": "XXXXXXX",
      "role": "user",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`

* **Sample Call:**

  ```
    curl --location --request GET 'host/users/5213a8i12332' \
    --header 'Authorization: XXXXXXXXX'
  ```
  
<a name="editu"></a> 
### Edit user

Update customer info by id

* **URL**

  /users/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**

  * name [String] (required)
  * email [String] (required)
  * password [String] (required)
  * role [String] (required)
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "5213a8i12332",
      "name": "user",
      "email": "user@domain",
      "password": "XXXXXX",
      "role": "admin"
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Only 'admin' or 'user' values are allowed for field 'role' }`

* **Sample Call:**

  ```
    curl --location --request PUT 'host/users/5213a8i12332' \
    --header 'Authorization: XXXXXXXXX' \
    --data-raw '{
      "name": "user",
      "email": "user@domain",
      "password": "XXXXXX",
      "role": "admin"
    }  
  ```
  
<a name="deleteu"></a>  
### Delete user

Remove user by id

* **URL**

  /users/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**<br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { User **user.name** removed }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Unauthorized }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ User not found }`

* **Sample Call:**

  ```
    curl --location --request DELETE 'host/users/5213a8i12332' \
    --header 'Authorization: XXXXXXXXX' \
    
  ```
