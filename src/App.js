import React, { Component } from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Logout/Logout';
import { connect } from "react-redux";
import * as actions from './store/actions/index';


import asyncComponent from './hoc/asynComponent/asyncComponent';


const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})
class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }
  render() {
    const a = {
      position: "absolute",
      boxSizing: "border-box",
      width: "100%", 
      height: "100%", 
      backgroundColor: "rgb(241, 241, 241)",
      margin: "0px",
      padding: "0px"
    }

    let routes = (
      <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
    
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
             <Route path="/orders" component={asyncOrders} />
             <Route path="/auth" component={asyncAuth} />
             <Route path="/logout" component={Logout} />
             <Route path="/" component={BurgerBuilder} />
             <Redirect to="/" />
        </Switch>

      )
    }

    return (
      <div style={a}>
        <Layout >
             
             {routes}
           
        </Layout>
       
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
