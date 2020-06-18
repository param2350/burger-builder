import React from 'react'
import Burger from '../../Burger//Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) => {

    
    return (
        <div className={classes.CheckOutSummary}>
            <h1> We hope it tastes well!</h1>
            <div className={classes.BurgerContainer}>
            
            <div style={{width :'100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients} />

            </div>

        </div>

        <Button btnType="Danger"
        clicked={props.checkoutCancelled}
        > Cancel </Button>
        <Button btnType="Success"
        clicked={props.checkoutContinued}
        > Continue </Button>

        </div>
    );
}

export default checkoutSummary;