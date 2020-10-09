import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';
import SplitCardForm from '../SplitCardForm/SplitCardForm';

const stripePromise = loadStripe('pk_test_51Ha0NwHzPLSUqmoM5X3KrSmuiIBb4B1O49hTgaG41KgrLMifyuux5Ba5WSOAELH6OjRst1xIL9Ua1ps1uPQ6SDiY00g9YYY8oJ');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            {/* <SplitCardForm></SplitCardForm> */}
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            {/* <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            /> */}
        </Elements>
    );
};

export default ProcessPayment;