import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import classes from "./App.css"
class App extends Component {
  render() {
    return (
      <div className={classes.Body}>
        <Layout >
          <BurgerBuilder></BurgerBuilder>
         
        </Layout>
      </div>
    );
  }
}

export default App;
