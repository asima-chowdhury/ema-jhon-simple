import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import loading from '../../images/loading.gif'

const ProductDetail = () => {
    document.title = 'Product Detail';
    let { productKey } = useParams();
    const [product, setProduct] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products/' + productKey)
            .then(res => res.json())
            .then(data =>{
                setProduct(data)
                setLoading(false)
            })
    }, [productKey])

    return (
        <div>
            <h1>Your Product Details: </h1>
            {
                loading?  <h1 style={{ color: 'green' ,textAlign: 'center'}}>loading........</h1>
                // <img src={loading} alt="loading" />
                :<Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;