import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgb(241, 241, 241)"}}>
        <Layout >
          <BurgerBuilder></BurgerBuilder>         
        </Layout>
       
      </div>
    );
  }
}

export default App;
