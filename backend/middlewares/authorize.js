import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded.userId)
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
    next();
}