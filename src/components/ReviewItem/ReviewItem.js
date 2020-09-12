import React from 'react';

const ReviewItem = (props) => {
    const { img, name, quantity, key, price } = props.product;
    // console.log(props);
    const reviewStyle = {
        borderBottom: "1px solid gray",
        marginBottom: "5px",
        marginLeft: "200px",
        paddingBottom: "5px"
    }
    return (
        <div style={reviewStyle} className="review-item">
            <img src={img} alt="" />
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price : $ {price}</small></p>
            <br />
            <button
                className="main-button"
                // onClick={props.removeProduct}
                // onClick={props.removeProduct(key)}
                onClick={() => { props.removeProduct(key) }}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;