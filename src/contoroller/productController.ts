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
