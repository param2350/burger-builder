import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
       
        <div onClick={props.menuButton} className={classes.Menu}>
            <div className={classes.MenuLine}></div>
            <div className={classes.MenuLine}></div>
            <div className={classes.MenuLine}></div>

        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
        </nav>
    </header>
);

export default toolbar;