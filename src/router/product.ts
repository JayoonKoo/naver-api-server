import express from "express";
import * as ProductController from "../contoroller/productController";

const router = express.Router();

router.get("/", ProductController.getProduct);

router.post("/buy", ProductController.buyProduct);

export default router;
