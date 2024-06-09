import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard - Ecommerce App"}>
            <div className='container-fluid'>
                <div className='row m-3 p-3'>
                    <div className='col-md-3'><UserMenu /></div>
                    <div className='col-md-9'>
                        <div className='card -75 p-3'>
                            <h4>{auth?.user?.name}</h4>
                            <h4>{auth?.user?.email}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
