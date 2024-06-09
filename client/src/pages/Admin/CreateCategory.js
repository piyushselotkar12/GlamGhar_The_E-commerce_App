import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';
import { Modal } from 'antd';
import { useAuth } from '../../context/auth';

const CreateCategory = () => {
    const [auth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name }, {
                headers: {
                    Authorization: auth.token
                }
            }
            );
            if (data?.success) {
                toast.success(`${name} created successfully`)
                getAllCategories()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in creating category");
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

    // Update category name
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName }, {
                headers: {
                    Authorization: auth.token
                }
            })
            if (data.success) {
                toast.success(`${data.category.name} is updated successfully`);
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategories()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    // Delete category name
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`, {
                headers: {
                    Authorization: auth.token
                }
            })
            if (data.success) {
                toast.success(`Category is deleted`);
                getAllCategories()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid'>
                <div className='row m-3 p-3'>
                    <div className='col-md-3'> <AdminMenu /> </div>
                    <div className='col-md-9'>Manage Category
                        <div className='w-50'><CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} /></div>
                        <div className='w-75'><table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((c) => {

                                    return <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary ms-2"
                                                onClick={() => {
                                                    setVisible(true);
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => {
                                                    handleDelete(c._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table></div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateCategory;
