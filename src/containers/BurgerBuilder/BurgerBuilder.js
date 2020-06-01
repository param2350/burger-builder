import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.8,
    meat: 1
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0.5,
        purchasable: false,
        limit: false,
        purchasing: false
    }

    updatePurchaseState(){
        const ingredients = {
            ...this.state.ingredients
        }

        let sum = Object.values(ingredients);
        let count = 0;
        for (var a of sum){
            count += a;
        }

        if(count >=0){
            this.setState({
                purchasable: true
            })
        }

        if(count > 6){
            this.setState({
                limit: true
            })
        }
        else{
            this.setState({
                limit:false
            })
        }
    }

    addIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients : updatedIngredients, totalPrice: newPrice},this.updatePurchaseState);
        
        

    }

    removeIngredientHandler = (type) => {
        console.log("here");
        const oldCount = this.state.ingredients[type];

        if(oldCount <0){
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCounted;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice}, this.updatePurchaseState);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    } 

    purchaseContinueHandler = () => {
        alert("please chosse a payment");
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
            
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        modalClosed={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                        ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    limit={this.state.limit}
                    order={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;