import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // can be functional component doesnt have to be a class component.
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (<li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}:</span>           {this.props.ingredients[igKey]}</li>);
    });
    return (
      <Aux>
        <h3>Your Burger</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout!</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }



}

export default OrderSummary;
