import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png';  
import classes from './Logo.css';
import {Link} from 'react-router-dom';

const Logo = (props) => (


    <Link to='/'>
        <div className={classes.Logo} > 
        <img src={burgerLogo} alt="Burger"></img>
    </div>
    </Link>
);

export default Logo;