import React from 'react'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {



    let trans_ingredients = Object.keys(props.ingredients)
    .map(i_key => {
        return [...Array(props.ingredients[i_key])].map((_,i) =>{
            return <BurgerIngredient key={i_key + i} type={i_key} />
        })
    }).reduce((prev,cur) => {
        return prev.concat(cur);
    }, []);

    if(trans_ingredients.length === 0){
        trans_ingredients = <p>Please Add Ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {trans_ingredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
}

export default burger;