import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: Number,
    description: String,
    stock: Number,
    category: String,
    rating: Number,
});

const Product  = mongoose.model("product", productSchema);
export default Product;