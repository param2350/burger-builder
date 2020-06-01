import React, { Component } from 'react';
import  Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'; 
class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    menuDrawer = () => {

        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
        
    }

    render() {
        return (
            <Aux>
            <Toolbar menuButton={this.menuDrawer}></Toolbar>
            <SideDrawer  open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            <div className={classes.Body}></div>
            </Aux>
        )
    }
};


export default Layout;