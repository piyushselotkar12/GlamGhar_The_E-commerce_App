import express from "express";
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCntController, productFiltersController, productListController, productPhotoController, relatedProductsController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
import { updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

// create-product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
// get all products
router.get('/get-product', getProductController)
// get product
router.get('/get-product/:slug', getSingleProductController)
//get photo
router.get('/product-photo/:pid', productPhotoController)
// delete product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);
// update product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController)

//filters 
router.post('/product-filters', productFiltersController)

// product count
router.get('/product-count', productCntController)

// product per page
router.get('/product-list/:page', productListController)

//search 
router.get('/search/:keyword', searchProductController)

//related products
router.get('/related-products/:pid/:cid', relatedProductsController)

//category wise products
router.get('/product-category/:slug', productCategoryController)

// token 
router.get('/braintree/token', braintreeTokenController)

// payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)
export default router;