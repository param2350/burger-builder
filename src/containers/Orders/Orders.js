import React, { Component } from 'react'
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

    _isMounted = false;
   
    componentDidMount() {
        this._isMounted = true
        
        this.props.onFetchOrders(this._isMounted,this.props.token,this.props.userid);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    

    render() {

        let orders = <Spinner />
        if(!this.props.loading){
            orders = (this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={ +order.price}
                    ></Order>
                ))
            )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userid : state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (_isMounted,token,userid) => dispatch(actions.fetchOrders(_isMounted,token,userid))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));