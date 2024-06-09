import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            (similarProducts(data?.product._id, data?.product.category._id))
        } catch (error) {
            console.log(error);
        }
    }
    const similarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`)
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='tw-flex tw-justify-center' style={{ height: "70vh" }}>
                <div className='row container tw-flex tw-shadow-xl tw-shadow-red-300/20 tw-pb-4' style={{ width: "80vw", height: "68vh" }}>
                    <div className='col-md-6'>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} class="card-img-top tw-rounded-lg tw-mb-4" alt="..." style={{ height: '400px', width: '300px' }} />
                    </div>
                    <div className='col-md-6'>
                        <div className='container'>
                            <h1 className='text-center tw-my-5 tw-text-2xl tw-text-green-500'>Product Details</h1>
                            <h6 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Name: {product.name}</h6>
                            <h6 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Description: {product.description}</h6>
                            <h6 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Price: ${product.price}</h6>
                            <h6 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Category: {product?.category?.name}</h6>
                            <h5 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Available Colors:</h5>
                            <div className='tw-flex'>
                                <div className='tw-h-6 tw-w-6 tw-rounded-full tw-bg-red-600 mx-3'></div>
                                <div className='tw-h-6 tw-w-6 tw-rounded-full tw-bg-yellow-600 mx-3'></div>
                                <div className='tw-h-6 tw-w-6 tw-rounded-full tw-bg-green-700 mx-3'></div>
                                <div className='tw-h-6 tw-w-6 tw-rounded-full tw-bg-blue-700 mx-3'></div>
                            </div>
                            <h5 className='tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Available Sizes:</h5>
                            <div className='tw-flex'>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>XS</button>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>S</button>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>M</button>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>L</button>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>XL</button>
                                <button className='btn mx-2 hover:tw-bg-black hover:tw-text-emerald-50' style={{ border: "solid 1px black" }}>2XL</button>

                            </div>
                            <a href="#" class="btn btn-primary w-25 mt-3 tw-transform active:tw-scale-110" >Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row container'>
                <h4 className='tw-font-sans tw-text-2xl tw-text-slate-700'>Similar Products</h4>
                {relatedProducts.length < 1 && <p className='text-area tw-font-sans tw-text-2xl tw-text-red-300'>No Similar Products found</p>}
                <div className='d-flex flex-wrap'>
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" style={{ width: "15rem" }}>
                            <img className="mt-2" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt="..." style={{ height: '190px', width: '280px' }} />
                            <div class="card-body">
                                <h5 class="card-title">{p.name}</h5>
                                <p class="card-text">{p.description.substring(0, 30)}...</p>
                                <p class="card-text"> ${p.price}</p>
                                <a href="#" class="btn btn-primary ms-1">Add to Cart</a>
                                <a href="#" class="btn btn-secondary ms-1" onClick={(e) => navigate(`/product/${p.slug}`)}>Details</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ProductDetails;
