import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {
   try{
      const products = await Product.find({});
      return res.status(200).json({
         success:true,
         data: products
      })
   }
   catch (error) {
      console.log("error in fetching products: ", error.message);
      return res.status(500).json({
         success:false,
         message:"Server error"
      })
   }
}

export const createProduct = async(req, res) => {
   const product = req.body;
   if(!product.name||!product.price||!product.image) {
      return res.status(400).json(
         {
            success:false,
            message: "Please provide all fields",
         }
      )
   }
   const newProduct = new Product(product);
   try{
      await newProduct.save();
      console.log(newProduct);
      return res.status(201).json({success:true, data: newProduct});
   }
   catch(error) {
      console.error("Error in Create new product", error.message);
      return res.status(500).json({
         success:false,
         message:"server error"
      });
   }
}

export const updatedProduct = async(req, res) => {
   
   const {id} = req.params;
   const product = req.body;
   
   if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success:false, message: "invalid Product id"});
   }

   try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
      return res.status(200).json({
         success:true,
         data: updatedProduct
      })
   }
   catch(error) {
      console.log("error while updating product", error.message)
      return res.status(500).json({
         success:false,
         message:error.message
      })
   }

}

export const deleteProduct = async(req, res) => {
   
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success:false, message: "invalid Product id"});
     }
   try{ 
      await Product.findByIdAndDelete(id);
      console.log(`item: ${id} deleted successfully`);
      return res.status(200).json({
         success:true,
         message: "Product deleted Successfully"
      }) 
      
   }
   catch(error) {
      console.log("error in deleting products: ", error.message);
      return res.status(500).json({
         success:false, message:"Server error"
      })
   }
}