import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import loading from '../../images/loading.gif'

const Shop = () => {
    document.title = 'Shop More';
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products?search=' + search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) => {
        // console.log('Product Added', product)
        const toBaAddedKey = product.key;

        const sameProduct = cart.find(pd => pd.key === toBaAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) { //need more clear concept here
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBaAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = event => {
        setSearch(event.target.value)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.length === 0 && 
                    // <div class="spinner-grow text-danger" role="status">
                    //     <span class="sr-only">Loading...</span>
                    // </div>
                    <img src={loading} alt="loading"/>
                }
                <input type="text" onBlur={handleSearch} placeholder="search....." />
                {
                    products.map(pd =>
                        <Product
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={pd}
                            key={pd.key}
                        ></Product>
                    )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;