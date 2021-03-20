import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasing: false,
        loading: false,
        isError: false 
    }

    updatepurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                          .map((igKey) => {
                              return ingredients[igKey]
                          })  
                          .reduce((sum, el) => {
                              return sum + el;
                          }, 0)
     return sum > 0;
    }
    

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  <OrderSummary 
        ingredients = {this.props.ings} 
        purchaseCanceled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}/>

        if(this.state.isError){
            orderSummary = <p>Something went Wrong ,May be you don't Connected with internet So check your connection and then <strong>Try To Refesh The page and then try to Order.</strong></p> 
        }
        else if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = { this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {this.updatepurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    price= {this.props.price} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
} 

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(BurgerBuilder)