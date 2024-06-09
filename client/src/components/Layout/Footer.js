import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer p-3'>
            <h4 className='text-center'>All rights reserved &copy; GlamGhar</h4>
            <div className='text-center mt-3'>
                <Link to="/about">About</Link>
                |
                <Link to="/contact">Contact</Link>
                |
                <Link to="/policy">Privacy Policy</Link>
            </div>
        </div>
    );
}

export default Footer;
