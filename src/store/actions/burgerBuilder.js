import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const addIngredient = (name) =>  {
    
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}


export const removeIngredient = (name) => {
    
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const fetchIngredienstFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {

    return (dispatch,getState) => {
       
        axios.get('https://burger-builder-93432.firebaseio.com/ingredients.json')
        .then(response => {
            
            dispatch(setIngredients(response.data))
        }).catch(err => {
            
            dispatch(fetchIngredienstFailed());
            
        });
        
    }
}