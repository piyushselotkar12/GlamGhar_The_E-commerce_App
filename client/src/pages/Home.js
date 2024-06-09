import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import Image6 from './images/Empty.gif'
import Banner from './images/2.png';

const Home = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all);
    }
    //filters
    const filteredProducts = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
            // if (data?.success) {
            setProducts(data?.products);
            // }

        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong")
        }
    }
    //get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            console.log("data",data);
            setLoading(false);
            // if (data?.success) {
            setProducts(data?.products);
            // }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts()
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filteredProducts()
    }, [checked, radio]);

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)

            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
            if (data?.success) {
                setTotal(data?.total)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (page > 1) loadMore()
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            console.log(page);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <Layout title={"All Products - Best Offers"}>
            <div className='row mt-3 ms-2'>
            <div class='col-md-12'>
                <img src={Banner} alt="Banner" style={{ height: '35%', width: '100%' }} />
            </div>


                <div className='col-md-3 mt-2'>
                    <h4 className='text-center'>Filter by Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (<label key={c._id} className='shadow-sm p-2 mb-1 bg-body-primary rounded'>
                            <input className='container-checkbox' type='checkbox'
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            />
                            {/* <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox> */}
                            &nbsp; &nbsp;{c.name}
                        </label>
                        ))}
                    </div>
                    <h4 className='text-center mt-3'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group>
                            {Prices?.map((p) => (<div className='shadow-sm p-2 mb-1 bg-body-primary rounded' key={p._id}>
                                <Radio value={p.array} onChange={(e) => setRadio(e.target.value)}>
                                    {p.name}
                                </Radio>
                            </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className='d-flex flex-column w-50 h-20 mt-3'>
                        <button className='btn btn-danger'
                            onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center tw-font-sans tw-text-3xl tw-text-red-400'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.length > 0 ? (products?.map((p, i) => (
                            <div className="card m-2" key={i + 1} style={{ width: "18rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." style={{ width: "287px", height: '310px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 60)}...</p>
                                    <p className="card-text"> {p.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD"
                                    })}</p>
                                    <button className="btn btn-primary ms-1 mx-2 tw-transform active:tw-scale-110"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                            toast.success("Item added to Cart")
                                        }}>Add to Cart</button>
                                    <button className="btn btn-secondary mx-2 ms-1 tw-transform active:tw-scale-110" onClick={(e) => navigate(`/product/${p.slug}`)}>Details</button>
                                </div>
                            </div>
                        ))) : (
                            <>
                                <img src={Image6} className='tw-transform tw-animate-pulse' style={{ marginLeft: "30px", width: "290px", height: "300px" }} alt='No product found by this filter' />
                                <h5>No product found by this filter</h5>
                            </>)}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products?.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault()
                                setPage(page + 1)
                            }}>
                                {products?.length > 0 && loading ? "Loading..." : "Load More"}

                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Home;
