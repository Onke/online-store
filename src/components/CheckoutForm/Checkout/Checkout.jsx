import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularPreogress, Divider, Button }  from  "@material-ui/core";

import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from "../PaymentForm";


const steps = ["Shipping address", "Payment details"];

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type : "cart"});
                setCheckoutToken(token);
            } catch (error){

            }
        }

        generateToken();
    }, [cart]);

    // const nextStep = setActiveStep((prevActiveStep) => prevActiveStep + 1) ; 
    // const backStep = setActiveStep((prevActiveStep) => prevActiveStep - 1) ;

    

    // const next = (data) => {
    //     setShippingData(data);
    //     nextStep();
    // }

    const Form = () => activeStep ===0 
    ? <AddressForm checkoutToken={checkoutToken} /*next={next}*/ /> 
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken}/>;

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    return (
        <>
          <div className= {classes.toolbar}/>
          <main className={classes.layout}>
              <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {
                            steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                     </Stepper>
                     { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form / > }
              </Paper>
          </main>  
        </>
    )
}

export default Checkout