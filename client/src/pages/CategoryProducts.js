import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryProducts = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getCategoryProduct()
    }, [params?.slug])

    const getCategoryProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            // console.log(data?.category);
            // console.log(data?.category[0]?.name);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='container mt-3'>
                <h1 className='text-center tw-font-sans tw-text-3xl tw-text-red-400'>Category: {category[0]?.name}</h1>
                <h5 className='text-center tw-text-2xl tw-font-sans tw-text-blue-400'>{products?.length} results found</h5>
                <div className='container ms-3'>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} class="card-img-top" style={{ width: "287px", height: '310px' }} alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{p.name}</h5>
                                    <p class="card-text">{p.description.substring(0, 60)}...</p>
                                    <p class="card-text"> ${p.price}</p>
                                    <a href="#" class="btn btn-primary ms-1 mx-2 tw-transform active:tw-scale-110">Add to Cart</a>
                                    <a href="#" class="btn btn-secondary ms-1 mx-2 tw-transform active:tw-scale-110" onClick={(e) => navigate(`/product/${p.slug}`)}>Details</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryProducts;
