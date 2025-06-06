"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Products = (0, express_1.Router)();
Products.get("/products", () => { });
Products.get("/products/:id", () => { });
exports.default = Products;
