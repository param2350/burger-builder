import React, { Component } from 'react';
import  Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'; 
import {connect} from 'react-redux';


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
            <Auxiliary>
            <Toolbar menuButton={this.menuDrawer} isAuthenticated={this.props.isAuthenticated}></Toolbar>
            <SideDrawer  open={this.state.showSideDrawer} isAuthenticated={this.props.isAuthenticated} 
                closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            <div className={classes.Body}></div>
            </Auxiliary>


        )
    } 
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);