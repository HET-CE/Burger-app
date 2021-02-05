import React, { Component } from 'react'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
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
     this.setState({purchasable: sum > 0})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatepurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ){
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatepurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Het Patel',
        //         address: {
        //             city: 'ahemedabad',
        //             state: 'gujrat',
        //             country: 'india'
        //         },
        //         email: 'hello@hello.com',
        //     },
        //     deliveryMethod: 'fastest'
        // }
        
        // axios.post('/orders.json', order)
        //     .then((response) => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch((error) => {
        //         // this.setState({loading: false, purchasing: false})
        //         this.setState({isError: true})
        //     })
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  <OrderSummary 
        ingredients = {this.state.ingredients} 
        purchaseCanceled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>

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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price= {this.state.totalPrice} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder