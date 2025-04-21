
# Multi-Vendor E-Commerce Application (React.js, Next.js, Node.js, MongoDB)

Multi-Vendor E-commerce application built with Next.js, Node.js, Express.js, Socket.io, and MongoDB. This Application supports three main roles: Admin, Seller, and Customer. Admin has full access to the platform. Anyone can create a seller account, but it must be approved by the admin. When a product is sold, a percentage of the sale is added to the admin's account, and sellers can withdraw their earnings. For payments, I integrated the Stripe payment system to ensure secure and seamless transactions. I also implemented complete user authentication, role-based access, and protected routes across the application. To enhance user interaction, I implemented a real-time messaging system using Socket.io, allowing smooth communication between customers, sellers, and admins.


## Features

- #### 🔐 Authentication
    - User registration & login (JWT-based)
    - Role-based access (Admin, Seller, Customer)
    - Password hashing with bcrypt
 
- #### 🧑‍💼 Admin Features
    - Approve/reject Sellers
    - Manage users, products, and orders
    - View platform analytics
    - Admin earns a commission from each sale
    - Admin approval required for sellers

- #### 🏬 Seller Features
    - Dedicated Seller dashboard
    - Sales and order analytics
    - Manage product listings and inventory

- #### 💬 Real-Time Messaging (Socket.io)
    - Chat between customers, sellers, and admin
    - Displayed active status
    - Enhance support and communication
- #### 📦 Order Management
    - Add to cart / checkout flow
    - Order tracking and status updates
    - Payment gateway integration (Stripe API)
    - Order history for users and Sellers
- #### 🔎 Other Highlights
    - Full-text search and filtering
    - Built a fully responsive and intuitive user interface with Next.js, ensuring smooth interaction on both desktop and mobile devices.
    - Server-side rendering (SSR) with Next.js
    - MongoDB for scalable document storage

## Prerequisites

- Node.js (>= 16.0.0)
- MongoDB (locally or using MongoDB Atlas)
## Installation

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/dilwalashakib/DreamShop.git
cd dream-shop
```

### 2. Install Dependencies
Install all dependencies.

```bash
npm install
```

### 3. Set Up MongoDB
- Create a new database in MongoDB (or use MongoDB Atlas).
- Set up a .env file and add the following environment variables:

```bash
DB_URL=mongodb://localhost:27017/dreamshop
SHOP_URL=http://localhost:3000
CLOUDINARY_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
TOKEN_SECRET_KEY=your_token_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SERVER=http://localhost:5000
```
- Replace MONGO_URI with your MongoDB connection string if you're using MongoDB Atlas or another remote database.

### 4. Run the Application

``` bash
npm run dev
```


### 5. Open the Application

```bash
http://localhost:3000
```

## How to Contribute
- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit them (git commit -am 'Add feature').
- Push to the branch (git push origin feature-name).
- Create a new Pull Request.

## Author
- [@dilwalashakib](https://www.github.com/dilwalashakib)


## License
License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.


