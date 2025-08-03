# ShoppyGlobe Backend

This is the backend for **ShoppyGlobe**, a simple e-commerce platform built with Node.js, Express, and MongoDB (using Mongoose).  
It provides APIs for user registration, login, product management, and cart operations.

---

## Features

- **User Authentication:** Register and login with secure password hashing and JWT-based authentication.
- **Product Management:** Add and manage products (model and controller assumed).
- **Cart Management:** Add, update, and remove products from a user's cart.

---

## Project Structure

```
shoppyglobeBackend/
│
├── Controllers/
│   ├── user.controller.js      # Handles user registration and login
│   └── cart.controller.js      # Handles cart operations (add, update, delete)
│
├── Models/
│   ├── User.model.js           # User schema (name, email, password)
│   ├── Product.model.js        # Product schema (assumed)
│   └── Cart.model.js           # Cart schema (userId, products array)
│
├── README.md                   # Project documentation
└── ...                         # Other files (routes, server setup, etc.)
```

---

## How It Works

### User Registration & Login

- **User.model.js:**  
  - Fields: `name`, `email` (unique), `password` (must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number).
  - Passwords are hashed before saving.
- **user.controller.js:**  
  - `createUser`: Registers a new user, checks for existing email, hashes password.
  - `loginUser`: Authenticates user, checks password, returns JWT token.

### Cart Operations

- **Cart.model.js:**  
  - Each user has one cart (`userId` is unique).
  - `products` is an array of `{ productId, quantity }`.
- **cart.controller.js:**  
  - `addToCart`: Adds a product to the user's cart or updates quantity if it already exists.
  - `updateCartQuantity`: Updates the quantity of a specific product in the cart.
  - `deleteFromCart`: Removes a product from the cart.

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd shoppyglobeBackend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```sh
   npm start
   ```

---

## API Endpoints (Examples)

### User

- `POST /register` – Register a new user
- `POST /login` – Login and get JWT token

### Cart

- `POST /cart/add` – Add product to cart
- `PUT /cart/update` – Update product quantity in cart
- `DELETE /cart/:productId` – Remove product from cart

---

## Notes for Beginners

- **Controllers** handle the logic for each API endpoint.
- **Models** define the structure of your data in MongoDB.
- **Password security:** Passwords are hashed using bcrypt before storing.
- **JWT:** Used for secure authentication.
- **Error handling:** Most endpoints return clear error messages for invalid input or failed operations.

---

## Contributing

Feel free to fork and contribute!  
For any issues, open an issue or pull request.

---

## License