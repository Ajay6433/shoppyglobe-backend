import Product from "../Models/Product.model.js";
import mongoose from 'mongoose';
import Cart from "../Models/Cart.model.js";

// Adding a product to the user's cart
export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Validating input fields
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Checking if productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    // Checking if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found, Product ID does not exist" });
    }

    // Finding the user's existing cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Creating a new cart if it doesn't exist
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }]
      });
    } else {
      // Checking if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Updating the quantity if product already exists in the cart
        cart.products[productIndex].quantity += quantity;
      } else {
        // Adding a new product to the cart
        cart.products.push({ productId, quantity });
      }

      // Saving the updated cart
      await cart.save();
    }

    return res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
}

// Updating the quantity of a specific product in the user's cart
export async function updateCartQuantity(req, res) {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  // Validating input
  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    // Finding the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Checking if the product exists in the cart
    const productIndex = cart.products.findIndex(
      item => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Updating the quantity of the product in the cart
    cart.products[productIndex].quantity = quantity;

    // Saving the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
}

// Deleting a product from the user's cart
export const deleteFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    // Finding the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Removing the product from the cart using filter
    const updatedProducts = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    // Updating the cart with remaining products
    cart.products = updatedProducts;
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};
