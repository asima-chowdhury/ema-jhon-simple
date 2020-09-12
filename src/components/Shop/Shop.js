import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);

        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            console.log(existingKey, savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            return product;
        });
        console.log(previousCart);
        setCart(previousCart);
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
    return (
        <div className="twin-container">
            <div className="product-container">
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