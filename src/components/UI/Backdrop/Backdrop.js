import React from 'react'
import classes from './Backdrop.css';


const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.backdrop}>{console.log(props.show)}</div> : null
);

export default backdrop;
