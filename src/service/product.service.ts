import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export const createProduct = (
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) => {
  return ProductModel.create(input);
};

export const findProduct = (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ProductModel.findOne(query, {}, options);
};

export const findAndUpdateProduct = () => {};

export const deleteProduct = () => {};
