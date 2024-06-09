import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import Layout from '../../components/Layout/Layout';

const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancel'])
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`, {
                headers: {
                    Authorization: auth.token,
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

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value },
                {
                    headers: {
                        Authorization: auth.token
                    }
                })
            getOrders()

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={'All Orders Data'}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 mt-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-3'>
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
                                                    <td><Select bordered={false} defaultValue={o?.status}
                                                        onChange={(value) => handleChange(o?._id, value)}
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s} >
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select></td>
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

export default AdminOrders;
