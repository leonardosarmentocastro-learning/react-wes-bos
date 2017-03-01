/**
 * @ Libs
 */
import React from 'react';

/**
 * @ Others
 */
import {formatPrice} from './../helpers';

/**
 * @ Class
 */
class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish    = this.props.fishes[key];
    const count   = this.props.order[key];

    if (!fish || fish.status === 'unavailable') {
      const text      = `Sorry, ${fish ? fish.name : 'fish'} is no longer available!`;
      const template  =
        <li key={key}>{text}</li>;

      return (template);
    }

    const totalForThatFish  = formatPrice(count * fish.price);
    const template          =
      <li key={key}>
        <span>{count} lbs - {fish.name}</span>
        <span className='price'>
          {totalForThatFish}
        </span>
      </li>;
    return (
      template
    );
  }

  render() {
    const orderIds  = Object.keys(this.props.order);

    let acumulator  = 0;
    const total     = orderIds.reduce((previousValue, currentValue, index, array) => {
      let accumulatedTotalUntilNow  = previousValue;
      let key                       = currentValue;

      const fish  = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = (fish && fish.status === 'available');
      if (isAvailable) {
        const totalForThatFish = (count * fish.price || 0)
        return accumulatedTotalUntilNow + totalForThatFish;
      }

      return accumulatedTotalUntilNow;
    }, acumulator);

    return (
      <div className='order-wrap'>
        <h2>Your order</h2>
        <ul className='order'>
          {
            orderIds.map(this.renderOrder)
          }

          <li className='total'>
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
