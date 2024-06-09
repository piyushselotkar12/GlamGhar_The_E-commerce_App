import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../Hooks/useCategory';
import { Link } from 'react-router-dom';
import Image1 from './images/men.jpg';
import Image2 from './images/women.jpg';
import Image3 from './images/kids.jpg';
import Image4 from './images/toys.jpg';
import Image5 from './images/electronic.jpg';

const Categories = () => {
    const categories = useCategory();
    // var slides;
    // var btns;
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    {categories.map((c) => (<div className='col-md-6 mt-3 mb-3 gx-2 gy-3'>
                        <button className='btn btn-primary'>
                            <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
                        </button>
                    </div>))}

                </div>
            </div>
            {/* <div class="img-slider">
                <div class="slider">
                    <img src={Image1} />
                    <div class="info">
                        <h2>Men's Fashion</h2>
                    </div>
                </div>
                <div class="slider">
                    <img src={Image2} />
                    <div class="info">
                        <h2>Women's Fashion</h2>
                    </div>
                </div>
                <div class="slider">
                    <img src={Image3} />
                    <div class="info">
                        <h2>Kid's Fashion</h2>
                    </div>
                </div>
                <div class="slider">
                    <img src={Image4} />
                    <div class="info">
                        <h2>Toys, Games</h2>
                    </div>
                </div>
                <div class="slider">
                    <img src={Image5} />
                    <div class="info">
                        <h2>Electronics</h2>
                    </div>
                </div>

                <div className='navigation'>
                    <div className='btn'></div>
                    <div className='btn'></div>
                    <div className='btn'></div>
                    <div className='btn'></div>
                    <div className='btn'></div>
                </div>
            </div>

            {
            } */}
        </Layout>
    );
}

export default Categories;
