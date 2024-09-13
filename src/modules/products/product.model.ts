import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      validate: {
        validator: (v: string) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(v),
        message: 'Product image URL must be a valid URL',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ name: 1 }, { unique: true });

const Product = model<TProduct>('Product', productSchema);

export default Product;
