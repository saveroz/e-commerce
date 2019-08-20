# e-commerce

## REST API
All end point routes start with http://localhost:3000
## /users end point

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/users/signUp`|POST|`none`|

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
|`/users/signIn`|POST|`none`|

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
   name: String (Required)
   price: Number (Required)
   image: File (Required)
   stock Number (Required)
success :
   status : 201
   message : 'product has been created successfully'
error :
   status: 404
   message : 'failed to create product'

### **Find Products**

Find all user's products
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
   
### **Find All Products**

Find all products in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/all`|GET|`token`|
Body:
   none
success :
   status: 200
   message: 'all products'
error :
   status: 404
   message: 'data not found'

### **Update product**

Update a product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|PATCH|`token`|

Body :
   name: String 
   price: Number 
   image: File 
   stock Number 
success :
   status: 200
   message: 'update successfull'
error:
   status: 404
   message: 'update failed'

note : one of the body variable have to different from before 

### **Delete Product**
Delete product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|DELETE|`token`|

Body :
   none
success :
   status: 200
   message: 'delete successfull'
error:
   status: 404
   message: 'failed to delete data'

