//const express = require("express");
import express from "express";
const app = express();
import dotenv from "dotenv";
import path from "path"
dotenv.config();
import {connectDB} from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const PORT = process.env.PORT || 5000;
app.use(express.json());
const __dirname = path.resolve();
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV==="production") {
   app.use(express.static(path.join(__dirname, "/frontend/dist")));
   app.get("*", (req,res)=> {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));

   });
}
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`🚀 Server started on port: ${PORT}`);
   });
}).catch(err => {
   console.error("❌ Failed to connect to MongoDB:", err);
   process.exit(1);
});
