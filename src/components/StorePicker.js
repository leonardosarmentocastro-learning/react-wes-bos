/**
 * @ Libs
 */
import React from 'react';

/**
 * @ Others
 */
import { getFunName } from './../helpers';

/**
 * @ Class
 */
class StorePicker extends React.Component {
  goToStore(event) {
    const storeId = this.storeInput.value;
    const route   = `/store/${storeId}`;

    event.preventDefault();

    const router = this.context.router;
    return router.transitionTo(route);
  }

  render() {
    /**
     * Para retornar templates HTML através do JSX, é necessário colocar seu
     * template dentro de um parênteses.
     *
     * NOTE: É importante ressaltar que para templates JSX, você só pode retornar
     * 1 elemento pai por template(comentários na primeira linha do template
     * também irão apontar erros).
     */
    return (
      <form className='store-selector' onSubmit={(event) => { this.goToStore(event) }}>
        {
          /**
           * 1. 'class' é uma palavra reservada, tanto para javascript quanto JSX.
           Sendo assim, não é possível setar o atributo 'class' nos seus elementos
           html. É necessário utilizar 'className' ao invés de 'class'.
           * 2. You can't use your own component's defined methods on the template
           * because react doesn't allow to.
           * In order to allow it, you have to wrap your method call into a arrow function
           * to have access to the `this` object.
           */
        }
        <h2>Please enter a store</h2>

        {
          /**
           * Use the 'ref' attribute to create a "reference" to the DOM input under the
           * `StorePicker` component, so we can access it in another methods of this component
           * and avoid DOM reference.
           */
        }
        <input type='text' placeholder='Store name' defaultValue={getFunName()}
        ref={(input) => this.storeInput = input} required />
        <button type='submit'>Visit store</button>
      </form>
    );
  }
}

/**
 * The `BrowserRouter` is a object that needs to be passed though all the child
 * components though the component `context`.
 * In order to make the router available into the `StorePicker` context, we need
 * to set the `contextTypes` property of the Component.
 */
StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
