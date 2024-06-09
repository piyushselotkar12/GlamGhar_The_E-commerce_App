import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth()
    let val = localStorage.getItem("auth")
    val = JSON.parse(val)
    let id = val.user._id

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
                headers: {
                    Authorization: auth.token,
                    _id: id
                }
            });
            setOrders(data);
        } catch (error) {
            console.log(error);
            toast.error('Error in  getting order')
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"My Orders"}>
            <div className='container-fluid'>
                <div className='row m-3 p-3'>
                    <div className='col-md-3'> <UserMenu /> </div>
                    <div className='col-md-9'>
                        {/* <div className='card -75 p-3'>
                            {JSON.stringify(orders, null, 4)}
                        </div> */}
                        <h3 className='text-center'>All Orders</h3>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className='border shadow'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Status</th>
                                                    <th>Buyers</th>
                                                    <th>Date</th>
                                                    <th>Payment</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container'>
                                            <div className='col-md-7'>
                                                {o?.products.map((p) => (
                                                    <div className='row m-2 card flex-row'>
                                                        <div className='col-md-4'>
                                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                                className="card-img-top"
                                                                alt="..." style={{ height: '190px', width: '200px' }} />
                                                        </div>
                                                        <div className='col-md-8 mt-3'>
                                                            <h5 className="card-title">{p.name}</h5>
                                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                                            <p className="card-text"> Price: ${p.price}</p>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Orders;
