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

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.8,
    meat: 1
}


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0.5,
        purchasable: false,
        limit: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-93432.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(err => {
                this.setState({error: true});
                
            })
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
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Paramvir',
                address: 'mumbai'
            },
            deliveryMethod: 'premium'

        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false, purchasing: false});

            }).catch(err => {
                this.setState({loading: false, purchasing: false});
            })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
            
        }

        let orderSummary = null;
        
        
        let burger = this.state.error ? <p style={{textAlign : "center"}}>cannot load ingredients</p>: <Spinner />

        if(this.state.ingredients){
            console.log(burger);
            burger = (
                <Auxiliary>
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
                </Auxiliary>
            )

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            modalClosed={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);