import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: ''
            },
            address: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your address'
                },
                value: ''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig: {
                    options: [
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'regular', displayValue: 'Regular'}
                    ]
                }, 
                value: 'fastest'
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your email'
                },
                value: ''
            }
        }
    }

    orderHandler= (event) => {

        
        event.preventDefault();

        
        const formData = {};

        for (let element in this.state.orderForm){
            formData[element] = this.state.orderForm[element].value
        }
  
        const order = {
            ingredients : this.props.ings,
            orderData: formData,
            deliveryMethod: 'premium',
            userid: this.props.userid,
            price: this.props.price


        }
        this.props.onOrderBurger(order);


    }

    onChangeHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updateElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updateElement.value = event.target.value;

        updatedOrderForm[inputIdentifier] = updateElement;

        this.setState({orderForm: updatedOrderForm});

    }


    render() {

        const formElementArray = [];

        for(let key in this.state.orderForm){

            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form =(
            <form onSubmit={this.orderHandler}>  
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.onChangeHandler(event,formElement.id)}
                    />
                ))}
                    
                    <Button btnType="Success">Order</Button>

                </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>

                {form}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userid: state.auth.userId
        
    }
}

const mapDispatchToProps =  dispatch => {
    return{
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);