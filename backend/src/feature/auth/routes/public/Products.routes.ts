import { Router } from "express";

const Products = Router();

Products.get("/products", () => {});
Products.get("/products/:id", () => {});

export default Products;
