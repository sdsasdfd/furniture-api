import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import express from "express";
import mongoose from "mongoose";

import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

import ProductRouter from "./routers/products.route.js";

import connectDB from "./db/connect.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store project</h1><a href="/api/products">Products</a>');
});

app.use("/api/products", ProductRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
