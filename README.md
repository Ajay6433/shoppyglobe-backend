# ShoppyGlobe Backend

This is the backend for **ShoppyGlobe**, a simple e-commerce platform built with Node.js, Express, and MongoDB (using Mongoose).  
It provides APIs for user registration, login, product management, and cart operations.

---
## URL for Github
```sh
    https://github.com/Ajay6433/shoppyglobe-backend
```

---

## Features

- **User Authentication:** Register and login with secure password hashing and JWT-based authentication.
- **Product Management:** Add and manage products (model and controller assumed).
- **Cart Management:** Add, update, and remove products from a user's cart.

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd shoppyglobe-Backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file with:
     ```
     PORT=your_port_number
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```sh
   npm start
   ```

