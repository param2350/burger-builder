import React from 'react'

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a 
        href={props.link}
        className={props.active? classes.active : null}
        ><span className={classes.ItemName}>{props.children}</span></a>
        </li>
);

export default navigationItem;