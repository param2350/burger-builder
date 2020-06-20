import * as actionTypes from '../actions/actionTypes'


const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    bacon: 40,
    meat: 50
}

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
        }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 20,
                error: false,
                building: false
            }

        case action.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
             

        default:
            return state;
    }
}

export default reducer; 