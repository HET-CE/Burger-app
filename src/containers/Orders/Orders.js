import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token , this.props.userId)
        axios.get('/orders.json')
                .then( res => {
                    const fetchOrders = []
                    for( let key in res.data) {
                        fetchOrders.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                    this.setState({ loading: false, orders: fetchOrders})
                })
                .catch( err => {
                    this.setState({ loading: true})
                })
    }
    render() {
        let orders = < Spinner />
        if (!this.props.loading) {
            orders = 
                this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))
            }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token , userId) => dispatch(actions.fetchOrder(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
