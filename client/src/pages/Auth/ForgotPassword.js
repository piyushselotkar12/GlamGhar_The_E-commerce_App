import { React, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout/Layout';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            })

            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || '/login');
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout title={"Reset Password - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1 className='title'> Forgot Password</h1>

                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter New Password' value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                            }} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputAnswer" placeholder='Enter Your Maternal Surname' value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                            }} required />
                    </div>
                    <div style={{ "paddingLeft": "14px" }}>
                        <button type="submit" className="btn">Reset Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
