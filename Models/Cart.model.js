import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Each cart is linked to one user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',       // References the User model
    required: true,
    unique: true       // Ensures one cart per user
  },
  // Array of products added to the cart
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // References the Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1       // Default quantity if not specified
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
