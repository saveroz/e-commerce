# e-commerce

##Link Deploy
 e-commerce.saveroz.com 

## Usage
```javascript
$ npm install
$ npm run dev
```

## REST API
All end point routes start with http://35.192.45.25 
## /users end point

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/users/register`|POST|`none`|

Body :  
   usernaname: String (Required)
   password: String (Required)
   email : String (Required) (Unique)
Success :
   status: 201
   message: 'You have successfully registered account'
error :
   status: 404
   message: 'failed to registered account'

### **Login User**

Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
   email: String (Required)
   password: String (Required)
Success :
   status: 200
   message : 'Login successfull'
   data: 'token'
error :
   status: 404
   message: 'email/password is wrong'

## /products end point

### **Create Product**

Create new product into the database
| Route | HTTP | Headers |
|---|---|---|
|`/products`|POST|`token`|
Body :
```
   name: String (Required)
   price: Number (Required)
   image: File (Required)
   stock Number (Required)
```
success :
```
   status : 201
   message : 'product has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create product'
```

### **Find All Products**

Find all products in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products`|GET|`token`|
Body :
   none
success :
   status: 200
   message: 'all user's data'
error:
   status: 404
   message: 'data not found'
   
### **Find One Products**

Find one product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   message: 'all products'
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update product**

Update a product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|PATCH|`token`|

Body :
```
   name: String 
   price: Number 
   image: File 
   stock Number 
```
success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```
note : one of the body variable have to different from before 

### **Delete Product**
Delete product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```

## /carts end point

### **Create carts**

Create a new cart into the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts`|POST|`token`|
Body :
```
   ProductId: String (Required)
   amount: Number (Required)

```
success :
```
   status : 201
   message : 'Cart has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create cart'
```

### **Find All Carts**

Find all User Carts in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts`|GET|`token`|
Body :
   none
success :
   status: 200
   message: 'all user's carts'
error:
   status: 404
   message: 'data not found'
   


### **Update cart**

Update a cart in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts/:id`|PATCH|`token`|

Body :
```
   ProductId : String 
   amount : Number 
  
```
success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```
note : one of the body variable have to different from before 

### **Delete cart**
Delete cart of user in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```

## /transactions end point

### **Create transactions**

Create new transactions into the database
| Route | HTTP | Headers |
|---|---|---|
|`/transactions`|POST|`token`|
Body :
```
   CartId : String (Required)
   totalPrice : Number (Required)

```
success :
```
   status : 201
   message : 'transactions has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create transactions'
```

### **Find All transactions**

Find all User transactions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/transactions`|GET|`token`|
Body :
```
   none
```
success :
```
   status: 200
   message: 'all user's transactions'
```
error:
```
   status: 404
   message: 'data not found'
```
   