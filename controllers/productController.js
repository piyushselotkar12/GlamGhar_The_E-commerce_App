import productModel from '../models/productModel.js';
import fs from 'fs';
import mongoose from 'mongoose';
import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js';
import braintree from 'braintree';
import dotenv from 'dotenv';
import orderModel from '../models/orderModel.js';

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //Validations
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        if (!description) {
            return res.status(401).send({ message: "Description is required" });
        }
        if (!price) {
            return res.status(401).send({ message: "Price is required" });
        }
        if (!category) {
            return res.status(401).send({ message: "Category is required" });
        }
        if (!quantity) {
            return res.status(401).send({ message: "Quantity is required" });
        }
        if (!photo) {
            return res.status(401).send({ message: "Photo is required" });
        }
        if (photo && photo.size > 3000000) {
            return res.status(401).send({ message: "Image size is should be less than 3 Mb" });
        }
        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.Type
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product created successfully",
        })
    }
    catch (err) {
        console.log(err);
        res.status(402).send({
            success: false,
            message: "Error in creating a product",
            err
        })
    }
}

//get All products 
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            Totalcnt: products.length,
            message: 'All Products',
            products,
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error in getting products list',
            error: error.message
        })
    }
}

// Get getSingleProduct

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in getting single product',
            error
        })
    }
}

// Get product Photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        req.status(200).send({
            success: true,
            message: 'Single Product',
            product
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error while getting product photo',
            error
        })
    }
}

// Delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in deleting a product',
            error
        })
    }
}

// update product

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //Validations
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        if (!description) {
            return res.status(401).send({ message: "Description is required" });
        }
        if (!price) {
            return res.status(401).send({ message: "Price is required" });
        }
        if (!category) {
            return res.status(401).send({ message: "Category is required" });
        }
        if (!quantity) {
            return res.status(401).send({ message: "Quantity is required" });
        }

        if (photo && photo.size > 1000000) {
            return res.status(401).send({ message: "Image size is should be less than 1 Mb" });
        }
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        const product = await productModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });
        await product.save();
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in updating a product',
            error
        })
    }
}


// Product Filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await productModel.find(args)
        res.status(200).send(
            {
                success: true,
                message: 'Filtered Products',
                products
            }
        )

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Products are not filtered',
            error
        })
    }
}

// Count products
export const productCntController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in counting products',
            error
        })
    }
}

// Per page list of products
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in getting products per page',
            error
        })
    }
}

// Search

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        console.log("Search results:", results);
        res.json(results)
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error in searching a product',
            error
        })
    }
}

// related Products Controller

export const relatedProductsController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(2).populate("category")
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in getting related products',
            error
        })
    }
}

// Product Category Controller

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in fetching products category wise",
            error
        })
    }
}

// token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (error, response) {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(200).send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.headers._id
                    }).save();
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            });

    } catch (error) {
        console.log(error);
    }
}