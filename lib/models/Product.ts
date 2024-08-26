import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  collection: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [String],
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;