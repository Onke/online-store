import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography}  from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm();
    const [shippingOption, setShippingOption] = useState("");
   const shippingOptions = [
       {
           id: 1,
           name: "Paxi",
           price: "R60",
           duration: "3 - 7 working days"
       }, 
    //    {
    //        id: 2,
    //        name: "InterTown",
    //        price: "R90",
    //        duration: "2 - 3 working days"
    //    }
    ];

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>   
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data}) )}>
                    <Grid container spacing={3}>
                        <FormInput name="firtname" label="First name" required/>
                        <FormInput name="surname" label="Surname" required/>
                        <FormInput name="email" label="Email" required/>
                        <FormInput name="address1" label="Address" required/>
                        <FormInput name="address2" label="Address" />
                        <FormInput name="suburb" label="Suburd" />
                        <FormInput name="city" label="City" required/>
                        <FormInput name="zip" label="Zip" required/>
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOptions[0].id} onChange={(e) => setShippingOption(shippingOptions[0])} fullWidth>
                            {
                                shippingOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>

                                ))
                            }
                            </Select> 
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display: "flex", justifyContent:"space-between"}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
                
            </FormProvider>
        </>
    )
}

export default AddressForm
