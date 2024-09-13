import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import Product from './product.model';
import httpStatus from 'http-status';
import { generateCustomProductId } from './product.utils';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ id });

  return result;
};

const createProductIntoDB = async (payload: TProduct) => {
  payload.id = generateCustomProductId();
  const result = await Product.create(payload);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const { name, description, category, price, discount, image } = payload;

  const modifiedData: Record<string, unknown> = {};

  modifiedData.name = name;
  modifiedData.description = description;
  modifiedData.category = category;
  modifiedData.price = price;
  modifiedData.discount = discount;
  modifiedData.image = image;

  const result = await Product.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete product');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedProduct;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete product');
  }
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
