import React from 'react';
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js';
import { useAuth } from '../../context/auth.js';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'><AdminMenu /></div>
                    <div className='col-md-9'>
                        <div class="card w-75">
                            <div class="card-body">
                                <h4 className=' tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Admin Name : {auth?.user?.name}</h4>
                                <h4 className=' tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Admin Email : {auth?.user?.email}</h4>
                                <h4 className=' tw-my-2 tw-font-sans tw-text-slate-700 tw-text-lg'>Admin Phone : {auth?.user?.phone}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default AdminDashboard;
