import React from 'react'
import Button from '../../UI/Buttton/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                                    .map(igKey => {
                                        return <li key={igKey}><span>{igKey}</span>: {props.ingredients[igKey]}</li>
                                    })    
    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout? </p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} >Continue</Button>
        </React.Fragment>
    )
}

export default OrderSummary