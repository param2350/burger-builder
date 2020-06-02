import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';


const modal = (props) => (
    <Auxiliary>
        <Backdrop show={props.show} backdrop={props.modalClosed}></Backdrop>
        <div className={classes.Modal}
        style={{
            transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1':'0'
        }}
        >
        {props.children}
    </div>
    </Auxiliary>
)

export default modal;