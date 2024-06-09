import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [shipping, setShipping] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("price", price);
            productData.append("photo", photo);
            productData.append("description", description);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            productData.append("category", category);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData, {
                headers: {
                    Authorization: auth.token
                }
            });
            if (data?.success) {
                toast.success(`${data.name} created successfully`);
                navigate('/dashboard/admin/products')
            } else {
                console.log(data.message);
                toast.error(`Product not created `);
            }
        }
        catch (err) {
            toast.error('Something went wrong')
            console.log(err);
        }
    }
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in getting categories')
        }
    }
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className='container-fluid'>
                <div className='row m-3 p-3'>
                    <div className='col-md-3'> <AdminMenu /> </div>
                    <div className='col-md-9'>Create Product
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder="Select a category" showSearch size='large'
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}> {c.name}</Option>
                                ))
                                }
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : 'Upload Photo'}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden></input>
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo &&
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt='Product Photo' height={'100px'} className='img img-responsive' />
                                    </div>
                                }
                            </div>
                            <div className='mb-3'>
                                <input className="form-control" type='text' placeholder='Write product name' value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className='mb-3'>
                                <textarea className="form-control" rows='3' placeholder='Write product description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className='mb-3'>
                                <input className="form-control" type='text' placeholder='Write product price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <div className='mb-3'>
                                <input className="form-control" type='number' placeholder='Enter product qunatity' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                            </div>
                            <Select
                                className="form-select mb-3" bordered={false} showSearch size='large' onChange={(value) => setShipping(value)} placeholder="Select Shipping">
                                <Option value="1" >Yes</Option>
                                <Option value="0" >No</Option>
                            </Select>

                        </div>
                        <div>
                            <button className='btn btn-primary' type='submit' onClick={handleCreate}>CREATE PRODUCT</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProduct;
