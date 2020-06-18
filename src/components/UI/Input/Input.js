import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input 
            onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea  
            onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;

    case "select": 
        inputElement = (
            <select className={classes.InputElement}  
                onChange={props.changed} value={props.value}>
                {props.elementConfig.options.map(op => (
                    
                    <option key={op.value} value={op.value}>{op.displayValue}</option>
                ))}
            </select>
        );
        break;
    default:
      inputElement = (
        <input 
           
         onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label}</label> */}
      {inputElement}
    </div>
  );
};

export default input;
