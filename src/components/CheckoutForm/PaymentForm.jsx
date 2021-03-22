import React from 'react';
import { Typgraphy, Divider, Button }  from "@material-ui/core";
import { Elements, CardElement, ElementConsumer  } from "@stripe/react-stripe-js";
import { loadStrip } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({checkoutToken}) => {
    return (
        <>
            <Review checkoutToken={checkoutToken} />
        </>
    )
}

export default PaymentForm
