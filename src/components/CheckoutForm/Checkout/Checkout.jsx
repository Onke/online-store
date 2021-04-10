import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button }  from  "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from "../PaymentForm";


const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch {
              if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);
      
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1) ; 
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1) ;

    

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

  

    let Confirmation = () => order.customer ?  (
        <>
          <div>
               console.log({order});
              <Typography variant="h5">Thank you for your purchace, {order.customer.firstname} {order.customer.surname}</Typography>
              <Divider className={classes.divider}/>
              <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>  
          <br/>
          <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }


    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>;


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
