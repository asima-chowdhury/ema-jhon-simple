import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <h1>Order History coming soon....</h1>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>price: </span><input type="text" /></p>
                <p><span>Quantity:</span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>

        </div>
    );
};

export default Inventory;