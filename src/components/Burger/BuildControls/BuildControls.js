import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
    
];


const buildControls = (props) => {
    
    return (
    <div className={classes.BuildControls}>
        <p><strong>{"Rs " + props.price.toFixed(2) * 60}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            added={() => props.ingredientAdded(ctrl.type)}   
            removed={()=> props.ingredientRemoved(ctrl.type)} 
            key={ctrl.label}
            limit={props.limit}
            disabled={props.disabled[ctrl.type]}
            label={ctrl.label}></BuildControl>
            
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.order}        
        >ORDER NOW</button>
    </div>
)};

export default buildControls;