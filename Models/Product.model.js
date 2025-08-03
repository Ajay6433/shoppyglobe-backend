import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Product must have a title
    },
    price: Number,         // Price of the product
    description: String,   // Description of the product
    stock: Number,         // Available quantity in stock
    category: String,      // Product category (e.g., electronics, clothing)
    rating: Number,        // Average customer rating
});

const Product  = mongoose.model("product", productSchema);
export default Product;