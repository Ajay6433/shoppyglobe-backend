import jwt from 'jsonwebtoken';

export function authUser(req, res, next) {
    // Extracting token from the Authorization header: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        // Verifying the token using JWT secret key
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Attaching the decoded user data to the request object
        req.user = user;

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", error: error.message });
    }
}
