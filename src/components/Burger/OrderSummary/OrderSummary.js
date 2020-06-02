import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';
const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients).map((i_key,index) => {
    return (
      <li key={i_key + index}>
        <span style={{ textTransform: "capitalize" }}>{i_key} </span> :
        {props.ingredients[i_key]}
      </li>
    );
  });

  return (
    <Aux>
      <h3 className={classes.Title}>Your Order</h3>
      <div className={classes.Box}>
        <p> A delicious burger with the following ingredients:</p>
        <ul>
        {summary}
        </ul>
        <p style={{
            textAlign : 'center'
        }}>{"Rs. " + props.price.toFixed(2) * 60}</p>
        <p style={{
            textAlign : 'center'
        }}>Continue to Checkout</p>

        <Button btnType="Danger" clicked={props.modalClosed} >Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
      </div>
    </Aux>
  );
};

export default orderSummary;
