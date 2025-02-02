import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive value"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be less than 0"],
    },
    image: {
      type: String, // URL to the product image
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
