import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, oneCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router();

//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// get-all category
router.get('/get-category', getAllCategoryController)

// get one category
router.get('/single-category/:slug', oneCategoryController)

// delete a category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)
export default router;