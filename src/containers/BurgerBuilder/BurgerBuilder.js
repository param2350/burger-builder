import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Auxiliary from "../../hoc/Auxiliary";
import classes from './BurgerBuilder.css'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';





class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 20,
        
        limit: false,
        purchasing: false,
        loading: false,
     
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(){
        const ingredients = {
            ...this.props.ings
        }

        let sum = Object.values(ingredients);
        let count = 0;
        for (var a of sum){
            count += a;
        }

        // if(count >=0){
        //     this.setState({
        //         purchasable: true
        //     })
        // }

        // if(count > 6){
        //     this.setState({
        //         limit: true
        //     })
        // }
        // else{
        //     this.setState({
        //         limit:false
        //     })
        // }

        return count > true;
    }

    // addIngredientHandler = (type) => {
        
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ingredients : updatedIngredients, totalPrice: newPrice},this.updatePurchaseState);
        
        

    // }

    // removeIngredientHandler = (type) => {
        
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount <0){
    //         return;
    //     }
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngredients[type] = updatedCounted;
    //     const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice}, this.updatePurchaseState);
    // }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    } 

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
    }
 
    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
            
        }

        let orderSummary = null;
        
        
        let burger = this.props.error ? <p style={{textAlign : "center"}}>cannot load ingredients</p>: <Spinner />

        if(this.props.ings){
            
            burger = (
                <Auxiliary>
                    <div className={classes.BurgerContainer}> <Burger ingredients={this.props.ings}></Burger></div>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        limit={this.state.limit}
                        order={this.purchaseHandler}
                    ></BuildControls>
                </Auxiliary>
            )

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            modalClosed={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.totalPrice}
            ></OrderSummary>

            if(this.state.loading){
                orderSummary = <Spinner />
            }

        }
        
        return (
            <Aux>
                <Modal 
                    
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                    
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));