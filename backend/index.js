import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
const app = express()
const port = 3000

dotenv.config();
const PORT = process.env.PORT || 3000;

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
