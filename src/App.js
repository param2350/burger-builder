import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
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
    return (
      <div style={a}>
        <Layout >
             <Switch>
             <Route path="/checkout" component={Checkout} />
             <Route path="/orders" component={Orders} />
             <Route path="/" component={BurgerBuilder} />
             </Switch>
        </Layout>
       
      </div>
    );
  }
}

export default App;
