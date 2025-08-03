import Product from "../Models/Product.model.js";
import Cart from "../Models/Cart.model.js";

export async function addToCart (req,res){
    try{
        const {productId, quantity} = req.body;
        const userId = req.user.id;
        if(!productId || !quantity){
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create new cart
            cart = await Cart.create({
                userId,
                products: [{ productId, quantity }]
            });
        } else {
            // Update existing cart
            const productIndex = cart.products.findIndex(
                (item) => item.productId.toString() === productId
            );
            if (productIndex > -1) {
                // Product exists in cart, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        }
        return res.status(201).json({ message: "Product added to cart", cart });
    }
    catch(error){
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
}

export const deleteFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product from the cart
    const updatedProducts = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    cart.products = updatedProducts;
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};
