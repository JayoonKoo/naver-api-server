import { RequestHandler } from "express";
import * as ProductNaverRepository from "../model/productNaver";

export const getProduct: RequestHandler = async (req, res, next) => {
  const data = await ProductNaverRepository.getAll();
  return res.status(200).json(data);
};

export const buyProduct: RequestHandler<
  {},
  {},
  ProductNaverRepository.ProductAttributes
> = async (req, res, next) => {
  const body = req.body;
  ProductNaverRepository.upsert(body);
  return res.sendStatus(200);
};

type GetProductByCategoryQuery = {
  categoryName?: string;
};
export const getProductByCategory: RequestHandler<
  {},
  {},
  {},
  GetProductByCategoryQuery
> = async (req, res, next) => {
  const { categoryName } = req.query;
  if (categoryName) {
    res
      .status(200)
      .json(await ProductNaverRepository.getDetailByCategory(categoryName));
  } else {
    const categories = await ProductNaverRepository.getByCategory();
    const data = categories.map((category) => ({
      x: category.category1,
      y: category.buyCount,
    }));
    const productByCategory = [
      {
        id: "category1",
        color: "hsl(89, 70%, 50%)",
        data,
      },
    ];
    res.status(200).json(productByCategory);
  }
};
