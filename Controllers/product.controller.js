import Product from "../Models/Product.model.js";

//This commented code is for seeding products into the database.
// Uncomment the following lines to seed products from mock data
// import { products } from "../utils/mockData.js";

// async function seedProducts(){
//     try {
//         // Checking if products already exist
//         const existingProducts = await Product.find();
//         if (existingProducts.length > 0) {
//             console.log("Products already seeded");
//             return;
//         }

//         // Inserting mock data into the database
//         await Product.insertMany(products);
//         console.log("Products seeded successfully");
//     } catch (error) {
//         console.error("Error seeding products:", error);
//     }
// }
// seedProducts();


// Fetch all products
export async function getProducts(req, res) {
    try {
        const products = await Product.find(); // Get all products from DB

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

// Fetch a single product by ID
export async function getProductById(req, res) {
    try {
        const { id } = req.params; // Extract product ID from URL

        const product = await Product.findById(id); // Find product by its MongoDB _id

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
}

