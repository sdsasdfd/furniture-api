import dotenv from "dotenv";
import mongoose from "mongoose";
import Products from "./models/products.model.js";
import fs from "fs";
dotenv.config();

const jsonProducts = "./products.json"; // Remove the extra space here
import connectDB from "./db/connect.js";

const productsData = JSON.parse(fs.readFileSync(jsonProducts, "utf8"));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Products.deleteMany();
    await Products.create(productsData);
    console.log("success...");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.env.exit(1);
  }
};

start();
