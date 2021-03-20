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

export const purchaseBurgerStart = ( orderData ) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.Data , orderData))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error))
                // this.setState({loading: false, purchasing: false})
            })
    }
}