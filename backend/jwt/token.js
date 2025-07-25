import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';


export const genarateTokenAndsaveinCookies = async (userId,res) => {
    const token = jwt.sign({userId} , process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10d'});
    res.cookie("jwt",token,{
        httpOnly: true,
        secure: false,
        sameSite: 'lax', // 'strict' or 'lax' based on your requirements
        path: '/' // Cookie is accessible on all routes
    });

    await User.findByIdAndUpdate(userId, {token});

    return token;
}