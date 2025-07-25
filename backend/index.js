import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import todoroute from './routes/todo.route.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';

const app = express()
const port = 3000

dotenv.config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // Adjust this to your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: "GET,POST,PUT,DELETE", // Specify allowed methods
  allowedHeaders: "Content-Type, Authorization" // Specify allowed headers
}))


// database connection
connectDB()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  }
)
})
.catch((error) => {
    console.error("Database connection failed:", error);
  }
);



app.use('/todo',todoroute);
app.use('/user', userRoute);