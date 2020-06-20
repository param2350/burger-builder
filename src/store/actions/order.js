import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
         type: actionTypes.PURCHASE_BURGER_SUCCESS,
         orderId: id,
         orderData
    }
}

export const purchaseBurgerFail = (err) => {
    return { 
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err

    };
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
        
    }
}


export const purchaseBurger = (orderData) => {
    
    
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart);
        axios.post('/orders.json?auth=' + getState().auth.token, orderData)
        .then(response => {
           dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            
        }).catch(err => {
            dispatch(purchaseBurgerSuccess(err));
         })
    }  
}  


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderFailed = error => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
        
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}


export const fetchOrders = (_isMounted,tok,userId) => {
    
    return (dispatch) => {
        
       const queryParams = '?auth='+ tok;
        axios.get('/orders.json' +queryParams)
            .then(res => {

                if(_isMounted){

                    let fetchedOrders = [];
                    for (let key in res.data){
                        if(res.data[key]["userid"] === userId){
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    }
                   
                    dispatch(fetchOrdersSuccess(fetchedOrders));
                }
                })
                .catch(err => {
                    dispatch(fetchOrderFailed(err)); 
            })
    }

}