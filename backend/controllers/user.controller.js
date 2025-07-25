import User from '../models/user.models.js';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import { genarateTokenAndsaveinCookies } from '../jwt/token.js';

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, { message: "Username alteast 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password alteast 6 characters long" }),
});

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" , user});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password:hashedPassword });
    await newUser.save();
    if (newUser) {
        const token = await genarateTokenAndsaveinCookies(newUser._id , res);
      res
        .status(201)
        .json({ message: "User registered successfully" , newUser , token});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errors: "All fields are required" });
        }
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if(!(await bcrypt.compare(password,user.password))) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = await genarateTokenAndsaveinCookies(user._id , res);

        res.status(200).json({ message: "User logged in successfully", user});
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Error logging user" , error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwt",{
            path:'/', 
        });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error during user logout:", error);
        res.status(500).json({ message: "Error logging out user" , error: error.message });
    }
}


export { registerUser , loginUser, logoutUser };