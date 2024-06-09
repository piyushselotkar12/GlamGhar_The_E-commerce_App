import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const { name, phone, address, email } = auth?.user;
        setName(name)
        setPhone(phone)
        setAddress(address)
        setEmail(email)
    }, [auth?.user])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
                name, password, phone, address
            });
            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth([...auth, data?.updatedUser])
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile updated successfully")
            }
        }
        catch (er) {
            console.log(er);
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"My Profile"}>
            <div className='container-fluid'>
                <div className='row m-3 p-3'>
                    <div className='col-md-3'> <UserMenu /> </div>
                    <div className='col-md-9'>
                        <div className='card -75 p-3'>
                            <div className='form-container'>
                                <form onSubmit={handleSubmit}>
                                    <h1 className='title'> MY PROFILE</h1>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="exampleInputName" placeholder='Enter Your Name' value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}

                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="exampleInputPhone" placeholder='Enter Phone Number' value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value)
                                            }} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value)
                                            }} />
                                    </div>
                                    <button type="submit" className="btn">UPDATE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
