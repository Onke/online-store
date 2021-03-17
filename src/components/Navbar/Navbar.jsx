import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/online-store.jpg";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography>
                        <img src={logo} alt="Online Store" height="25px" className={classes.image} />
                        Online Store
                    </Typography>
                    <div  className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color={'inherit'}>
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
