import React from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, handleRemoveFromCart, handleUpdateCartQty, handleEmptyCart }) => {
    const isEmpty = !cart.total_items; 
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1" >You have no items in your shoping cart <br/>
            <Link to="/" className={classes.link}>Back to store</Link>
        </Typography>
    );
    const FilledCart =  () => (
        <> 
            <Grid container spacing={3} >
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart= {handleRemoveFromCart}/>
                        </Grid>
                    ))
                }
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="h4">
                    Total : {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick = {() => handleEmptyCart()}>Empty Cart</Button>
                    <Button className={classes.checkooutButton} size="large" type="button" variant="contained" color="primary" >Checkout</Button>
                </div>
            </div>
         </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom> Your Shopping Card</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
