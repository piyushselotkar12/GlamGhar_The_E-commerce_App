import React from 'react';
import Layout from '../components/Layout/Layout';
import Image1 from './images/Contact.png';
import Image2 from './images/email.png';
import Image3 from './images/phone-call.png';
import Image4 from './images/live-chat.png';
import Image5 from './images/toll-free.png';

const Contact = () => {
    return (
        <Layout title={"Contact Us"}>
            <div className='row contactus'>
                <div className='col-md-6 imgc'>
                    <img src={Image1}
                        alt='Contact Us'
                    />
                </div>
                <div className='col-md-5'>
                    <h1 className='con-title text-center'>Contact Us</h1>
                    <h5 className='con-content'>&nbsp; &nbsp; "Connect with our passionate team of shopping guides"</h5>
                    <div className='waystocont'>
                        <div className='phone'>
                            <div className='p-img'>
                                <img src={Image3} style={{ height: "50px", width: "50px", }}
                                    alt='Call Us'
                                />
                                <h5>Call Us</h5>
                            </div>
                            <p>+9110122001</p>
                        </div>
                        <div className='email'>
                            <div className='e-img'>
                                <img src={Image2} style={{ height: "50px", width: "50px" }}
                                    alt='Email'
                                />
                                <h5>Email</h5>
                            </div>
                            <p>supportglamghar@gmail.com</p>
                        </div>
                        <div className='toll-free'>
                            <div className='t-img'>
                                <img src={Image4} style={{ height: "50px", width: "50px" }}
                                    alt='Chat'
                                />
                                <h5>Toll Free</h5>
                            </div>
                            <p>9988776655</p>
                        </div>
                        <div className='live-chat'>
                            <div className='l-img'>
                                <img src={Image5} style={{ height: "50px", width: "50px" }}
                                    alt='Chat'
                                />
                                <h5>Live Chat</h5>
                            </div>
                            <p className='chat-btn text-center'>Chat</p>
                        </div>
                    </div>
                    <h5>
                        Available 24/7, to unveil an extraordinary shopping journey tailored just for you!
                    </h5>
                </div>
            </div>
        </Layout>
    );
}

export default Contact;
