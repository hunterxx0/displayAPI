# Portfolio Project - Display
## Where buyers and sellers come together
### Introduction

In this project, we will implement a website from scratch. We will use the knowledge we have acquired so far.

We're free to implement it the way we want.

### Objective

The objective is to implement a fully functional website. It is primarily used to exhibit products on a 24-hour basis.

### Backend

We are building an extensive backend API using Node.js & Express and protecting sensitive routes/endpoints with JWT (JSON Web Tokens).

#### Sections

- Authentication
- Admins
- Sellers
- Products
- Users

#### Requirements

- NodeJS v16.14.2
- Express v4.18.1
- Mongoose v6.5.1

#### Routes

##### Admin:

| HTTP method  | Route  | Description |
| :------------ |:---------------:| -----:|
| POST      | /admin | create an admin (JWT Protected) |
| GET      | /admin/:id/logs | admin notifications |
| DELETE      | /admin/:id/clr/logs | delete admin notifications |

##### Authentication:

| HTTP method  | Route  | Description |
| :------------ |:---------------:| -----:|
| POST      | /auth/signupSeller | seller signup |
| POST      | /auth/signup | user signup |
| POST      | /auth/login | login |
| PATCH      | /auth/editlogin | edit user/seller info |
| DELETE      | /auth/eraseUser/:id | delete a user |

##### Product:

| HTTP method  | Route  | Description |
| :------------ |:---------------:| -----:|
| GET      | /products | products list |
| GET      | /products/page/:number | products list by page |
| GET      | /products/:id | product by ID |
| GET      | /products/title/:title | product by title |
| GET      | /products/title/:title/category/:category | product by title and category |
| GET      | /products/seller/:seller/category/:category | product by seller and category |
| GET      | /products/seller/:sellerName | products by seller |
| GET      | /products/category/:category | products by category |
| GET      | /products/sellers/category/:category | seller's products by category |
| GET      | /products/user/requests | products user requests |
| PATCH      | /products/:id | product update (JWT Protected) |
| PATCH      | /products/:id/requests | add product request |
| DELETE      | /products/:id/requests/:requestID | delete a product's requests |
| DELETE      | /products/:id | delete a product (JWT Protected) |
| POST      | /products | add a product (JWT Protected) |

##### Seller:

| HTTP method  | Route  | Description |
| :------------ |:---------------:| -----:|
| GET      | /sellers | sellers list |
| GET      | /sellers/page/:number | sellers list by page |
| GET      | /sellers/:id | seller by ID |
| GET      | /sellers/name/:name | seller by name |
| GET      | /sellers/:id/notifications | seller's notifications |
| GET      | /sellers/:id/notifications/unread | seller's unread notifications |
| GET      | /sellers/:name/followers | seller's followers list |
| PATCH      | /sellers/:id/notifications/:notifID | read a seller's notification |
| PATCH      | /sellers/:name/upgrade/:plan | upgrade a seller's plan |
| DELETE      | /sellers/:id/notification/:notifID | delete a seller's notification |
| DELETE      | /sellers/:id/clr/notification | delete a seller's notification list |

##### User:

| HTTP method  | Route  | Description |
| :------------ |:---------------:| -----:|
| GET      | /users | users list |
| GET      | /users/page/:number | users list by page |
| GET      | /users/:id/ | user by ID |
| GET      | /users/:id/notifications | user's notifications |
| GET      | /users/:id/notifications/unread | user's unread notifications |
| GET      | /users/:id/following | user's following list |
| PATCH      | /users/:id/search/:keyword | add a user's recently searched word |
| PATCH      | /users/:id/favorites/:favorite | add a user's favorite product |
| PATCH      | /users/:id/requests/:requestID | add a user's request |
| PATCH      | /users/:id/notifications/:notifID | read a user's notification |
| PATCH      | /users/:id/follow/:sellerName | add a user's follow |
| DELETE      | /users/:id/search/delete/:keyword | delete user's recently searched word |
| DELETE      | /users/:id/search/clear | delete a user's recently searched list |
| DELETE      | /users/:id/views/delete/:productID | delete a user's recently viewed product |
| DELETE      | /users/:id/views/clear | delete a user's recently viewed products list |
| DELETE      | /users/:id/favorites/:favorite | delete a user's favorite product |
| DELETE      | /users/:id/requests/:requestID | delete a user's request |
| DELETE      | /users/:id/notification/:notifID | delete a user's notification |
| DELETE      | /users/:id/clr/notification | delete a user's notification list |
| DELETE      | /users/:id/follow/:sellerName | delete a user's follow |
| DELETE      | /users/:id/clr/follow | delete a user's follow list |

### How to do it

- reset CSS styling
- use variables
- simple/“as generic as you can” CSS selectors
- avoid as more as you can super-specific CSS selector
- simple HTML structure - div containers are your friend!

### When it's done

![](images/done.jpg)
