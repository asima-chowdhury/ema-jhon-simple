import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart,processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history =useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        // console.log("clicked",productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        removeFromDatabaseCart(productKey);
        setCart(newCart);
    }
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data =>setCart(data))

    }, [])

    let thankyou;
    
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <h1>Cart Items: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>
                    )
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;