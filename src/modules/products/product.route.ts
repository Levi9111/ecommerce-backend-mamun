import { Router } from 'express';
import { ProuctController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';

const router = Router();

router.get('/', ProuctController.getAllProducts);
router.get('/:productId', ProuctController.getSingleProduct);
router.patch('/:productId', ProuctController.updateAProduct);
router.delete('/:productId/remove-product', ProuctController.deleteProduct);
router.post(
  '/create-product',
  validateRequest(ProductValidations.productValidationSchema),
  ProuctController.createProduct,
);

export const ProductRoutes = router;
