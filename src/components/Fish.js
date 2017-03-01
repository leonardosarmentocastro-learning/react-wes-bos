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
class Fish extends React.Component {
  render() {
    /**
     * NOTE:
     *
     * This is ES6 destructure, which is the same as typing:
     * `const details = this.props.details;`
     * `const index   = this.props.index;`
     */
    const {details, index} = this.props;

    const isAvailable = (details.status === 'available');
    const buttonText  = isAvailable ? 'Add to order' : 'Sold out!';

    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name}/>
        <h3 className='fish-name'>
          {details.name}
          <span className='price'>{formatPrice(details.price)}</span>
        </h3>
        <p>{details.description}</p>

        {
          /**
           * NOTE:
           *
           * We wrap the `onClick` event into a closure so it doesn't get fired
           * on the component first load.
           */
        }
        <button
        onClick={() => this.props.addToOrder(index)}
        disabled={!isAvailable}
        >{buttonText}</button>
      </li>
    );
  }
}

export default Fish;
