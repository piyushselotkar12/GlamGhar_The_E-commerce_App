import { React, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name, email, password, phone, address, answer
            });
            console.log("JAPSPAP");
            if (res && res.data.success) {
                toast.success(res && res.data.message, { duration: 5000 });
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (er) {
            console.log(er);
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Register - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1 className='title'> Register</h1>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputName" placeholder='Enter Your Name' value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputPhone" placeholder='Enter Phone Number' value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputAnswer" placeholder='Enter Your Maternal Surname' value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                            }} required />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
