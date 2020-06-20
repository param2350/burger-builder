import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }

}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userid');
    
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkLogTimeout = (expirationTime) => {
 
    return dispatch => {
        setTimeout(() => {
            dispatch(logout)
        }, expirationTime*1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email: email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcFNvmSjoV69T70-N7n5xrPPI68K17whc';

        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcFNvmSjoV69T70-N7n5xrPPI68K17whc';
        }
        axios.post(url, authData)
            .then(response => {
                
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userid',response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkLogTimeout(response.data.expiresIn));
            })
            .catch(err => {
              
                dispatch(authFail(err.response.data.error));
            })
    }

}

export const authCheckState = () => {
    return dispatch => {
        
        const token = localStorage.getItem('token');
        if(!token) {
            
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                
                const userid = localStorage.getItem('userid');
               
                dispatch(authSuccess(token,userid));
                dispatch(checkLogTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }

    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
