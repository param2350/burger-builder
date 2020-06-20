import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import icon from "../../assets/images/user.png"
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email",
        },
        value: "",
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
      },
    },
    isSignup: true,
  };

  componentDidMount () {
    if(!this.props.building && this.props.redirectpath !=='/'){
      this.props.setRedirectPath();
    }
  }

  onChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.controls,
    };

    const updateElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updateElement.value = event.target.value;

    updatedOrderForm[inputIdentifier] = updateElement;

    this.setState({ controls: updatedOrderForm });
  };

  switchAuthHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.onChangeHandler(event, formElement.id)}
      />
    ));

    if(this.props.loading) {
      form = <Spinner />
    }

    let redirect = null;
    if(this.props.isAuthenticated){
            
            redirect = <Redirect to={this.props.redirectpath} />
    }


    let errorMessage = null;

    if(this.props.error){
      errorMessage = <p>{this.props.error.message}</p>
    }
    return (
      <div className={classes.Auth}>
        {redirect}
        <div style={{margin: "10px auto"}}>
          <img src={icon} alt="icon" height="60px" width="60px"></img>
        </div>
        <p style={{color: "#474E5D"}}>{this.state.isSignup? <strong>Sign Up</strong>: <strong>Sign In</strong>}</p>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
          
        </form>
        <Button btnType="Danger" clicked={this.switchAuthHandler}>
            Switch To {this.state.isSignup ? "Signin" : "Signup"}
          </Button> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    redirectpath: state.auth.redirectpath
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    setRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
