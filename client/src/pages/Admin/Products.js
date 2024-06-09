import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([]);


    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data.products)
        }
        catch (err) {
            console.log(err);
            toast.error('Error in listing all product')
        }

    }
    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h2 className='text-center'>All Products List </h2>
                    <div className='d-flex'>
                        {products.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>

                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{p.name}</h5>
                                        <p class="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Products;
