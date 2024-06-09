import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }
        // check if category already exists
        const checkCategory = await categoryModel.findOne({ name });
        if (checkCategory) {
            return res.status(201).send({
                success: false,
                message: 'Category already exists'
            });
        }

        // save the category in db
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(200).send({
            success: true,
            message: "New category created successfully",
            category
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: 'Something went wrong'
        })
    }
}

// update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        // check if category already exists
        const checkCategory = await categoryModel.findOne({ name });
        if (checkCategory) {
            return res.status(201).send({ message: 'Category already exists' });
        }

        // save the category in db
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Category Updated done successfully",
            category
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: "Something went wrong"
        })
    }
}

// get all categories
export const getAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        console.log("res",res);
        res.status(200).send({
            success: true,
            message: "All categories displayed successfully",
            category
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting all categories",
            err,
        })
    }
}

// get single category
export const oneCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Successfully got a category",
            category
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: "Error in getting a category",
            err
        })
    }
}

// Delete a category
export const deleteCategoryController = async (req, res) => {

    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Successfully deleted a category"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting a category",
            error
        })
    }
}