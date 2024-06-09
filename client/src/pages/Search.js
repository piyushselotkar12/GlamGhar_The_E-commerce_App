import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'Product Not Found' : `Found: ${values?.results.length}`}</h6>
                    <div className='d-flex flex-wrap'>
                        {values?.results?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{p.name}</h5>
                                    <p class="card-text">{p.description.substring(0, 60)}...</p>
                                    <p class="card-text"> ${p.price}</p>
                                    <a href="#" class="btn btn-primary ms-1">Add to Cart</a>
                                    <a href="#" class="btn btn-secondary ms-1">Details</a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Search;
