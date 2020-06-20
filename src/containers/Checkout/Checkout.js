import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import classes from './Checkout.css'
import {connect} from 'react-redux';

class Checkout extends Component {
   
    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />

        if(this.props.ings){
            let purchasedDone = this.props.purchased ? <Redirect to="/" />: null;
            summary = <div className={classes.Checkout}>
            {purchasedDone}
            <CheckoutSummary
                ingredients={this.props.ings}
                price = {this.props.totalPrice}
                checkoutCancelled={this.CheckoutCancelledHandler}
                checkoutContinued={this.CheckoutContinuedHandler}
            >

            </CheckoutSummary>

            <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData} />
        </div>
        }
        return summary;
            
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
