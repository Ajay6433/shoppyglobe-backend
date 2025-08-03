import jwt from 'jsonwebtoken';

export function authUser(req,res,next){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized access"});
    }
    console.log("Token received:", token);
    try {
        // Assuming a function verifyToken exists to validate the token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({message: "Invalid token", error: error.message});
    }
}