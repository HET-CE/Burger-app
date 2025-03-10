import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id , orderData) => {
    return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderid: id,
    orderData: orderData
    }
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData , token ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name , orderData))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error))
                // this.setState({loading: false, purchasing: false})
            })
    }
}

export const afterPurchaseBurgerRedirect = () => {
    return {
        type: actionTypes.AFTER_PURCHASE_BURGER_REDIRECT
    }
}

export const fetchOrderSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrder = (token , userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get('/orders.json' + queryParams)
        .then( res => {
            const fetchOrders = []
            for( let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch( err => {
            dispatch(fetchOrderFail(err));
        })
    }
}