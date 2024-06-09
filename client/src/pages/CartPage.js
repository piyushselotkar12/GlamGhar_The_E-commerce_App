import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";


const CartPage = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [instance, setInstance] = useState("");
    const [clientToken, setclientToken] = useState("");
    const [loading, setLoading] = useState(false);

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((c) => (
                total += c.price
            ))
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {
            console.log(error);
        }
    }
    // delete item
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }

    // get payment gateway token 
    const getToken = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setclientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])

    const handlePayment = async () => {
        try {
            setLoading(true);
            let val = localStorage.getItem("auth");
            val = JSON.parse(val);
            let id = val.user._id

            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce, cart
            }, {
                headers: {
                    Authorization: auth.token,
                    _id: id
                }
            })
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment completed successfully')
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='text-center mt-3 tw-font-sans tw-text-green-500 tw-text-2xl'>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
                        <h4 className='text-center tw-font-sans tw-text-red-300 tw-text-xl'>
                            {cart.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : 'Please Log in to checkout'}` : 'Your Cart is empty'}
                        </h4>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-7'>
                        {cart.map((p) => (
                            <div className='row m-2 card flex-row'>
                                <div className='col-md-4'>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt="..." style={{ height: '190px', width: '230px', marginTop: "8px", marginBottom: "8px", borderRadius: "5px" }} />
                                </div>
                                <div className='col-md-8 mt-3'>
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text tw-font-sans"> Price: ${p.price}</p>
                                    <button className='btn btn-danger tw-transform active:tw-scale-110' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-5 text-center'>
                        <h4 className='tw-font-sans tw-text-slate-700 tw-text-lg'>Cart Summary</h4>
                        <h4 className='tw-text-slate-700 tw-text-lg'>Total | Checkout | Payment</h4>
                        <hr />
                        <h2 className='tw-text-slate-700 tw-text-lg'>Total: {totalPrice()}</h2>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4 className='tw-text-slate-700 tw-text-lg'>Current Address</h4>
                                    <h1>{auth?.user?.address}</h1>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                </div>
                            </>
                        ) : (<div className='mb-3'>
                            {auth?.token ? (<button className='btn btn-outline-warning'
                                onClick={() => navigate('/dashboard/user/profile')}
                            >Update Address</button>) :
                                <button className='btn btn-outline-warning'
                                    onClick={() => navigate('/login', {
                                        state: '/cart'
                                    })}
                                >Please Login to checkout</button>}
                        </div>)}
                        <div className='mt-2'>
                            {!clientToken || !auth?.token || !cart.length ? ("") : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button className='btn btn-primary' onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >{loading ? "Processing ...." : "Make Payment"}</button>
                                </>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
