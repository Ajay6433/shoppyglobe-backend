import Product from "../Models/Product.model.js";
// import { products } from "../utils/mockData.js";


// async function seedProducts(){
//     try {
//         // Check if products already exist
//         const existingProducts = await Product.find();
//         if (existingProducts.length > 0) {
//             console.log("Products already seeded");
//             return;
//         }

//         // Insert mock data into the database
//         await Product.insertMany(products);
//         console.log("Products seeded successfully");
//     } catch (error) {
//         console.error("Error seeding products:", error);
//     }
// }
// seedProducts();
export async function getProducts(req,res){
    console.log(req.user.id);
    try{
        const products = await Product.find();
        if(products.length === 0){
            return res.status(404).json({message: "No products found"});
        }
        return res.status(200).json({message: "Products fetched successfully", products});
    }
    catch(error){
        res.status(500).json({message: "Error fetching products", error: error.message});
    }
}

export async function getProductById(req,res){
    try{
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({message: "Product fetched successfully", product});
    }
    catch(error){
        res.status(500).json({message: "Error fetching product"});
    }
}

