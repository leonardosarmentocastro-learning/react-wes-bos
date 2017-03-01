/**
 * @ Libs
 */
import React from 'react';

/**
 * @ Components
 */
import Header       from './Header';
import Fish         from './Fish';
import Inventory    from './Inventory';
import Order        from './Order';

/**
 * @ Others
 */
import sampleFishes from './../sample-fishes';
import base from './../base';

/**
 * @ Class
 */
class App extends React.Component {
  constructor() {
    super();

    /**
     * Public functions.
     */
    this.addFish          = this.addFish.bind(this);
    this.removeFish       = this.removeFish.bind(this);
    this.updateFish       = this.updateFish.bind(this);
    this.loadSamples      = this.loadSamples.bind(this);
    this.addToOrder       = this.addToOrder.bind(this);
    this.removeFromOrder  = this.removeFromOrder.bind(this);

    /**
     * Sets the component initial state object.
     */
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    /**
     * 1. Makes a shallow copy of the fishes in the state for perfomance improvement.
     * (this way we can tell React later on, which part of the state he must update instead of letting
     * him discover which one was changed).
     */
    const fishes = {...this.state.fishes};

    /**
     * Add our new fish to the fishes object.
     */
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    /**
     * Sets the new fishes into the state.
     * QUESTION: Is it going to update the entire state object?
     */
    this.setState({ fishes: fishes});
  }

  removeFish(key) {
    const fishes  = {...this.state.fishes};
    fishes[key]   = null; /* firebase need things to be equals null in order to get deleted. */

    this.setState({ fishes });
  }

  /**
   * Used by the "Inventory" component.
   */
  updateFish(key, updatedFish) {
    const fishes  = {...this.state.fishes};
    fishes[key]   = updatedFish;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    /**
     * Shallow copy of the 'order' object.
     */
    const order = {...this.state.order};

    /**
     * If this [key] is already created on the order object, sums it one more;
     * Otherwise, creates it with the value of '1'.
     */
    order[key] = order[key] + 1 || 1;

    /**
     * Updates the state.
     */
    this.setState({ order: order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};

    /**
     * We just need to remove from the state, because since the `componentWillUpdate` method
     * will be fired when the state changes, by removing from the state, it will also remove it
     * from the local storage.
     */
    delete order[key];
    this.setState({ order });
  }

  /**
   * @ React methods
   */
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh sea food'/>
          <ul className='list-of-fishes'>
            {
              /**
               * NOTE 1:
               *
               * There is no way to actually iterate through JSX without runnig
               * actual javascript. Thats why we open those brackets to iterate
               * over the fishes objects on the App state.
               *
               * NOTE 2:
               *
               * The `key` property is a React property to identfy that component
               * as unique while rendering a bunch of the same component, knowing
               * that way, which one of the 'Fish' component he needs to update
               * when the time has come.
               *
               * NOTE 3:
               *
               * Since the 'key' property is only available for React itself, we cant
               * see or use it inside the 'Fish' component.
               * Thats why we create another property called 'index' to allow us to
               * identify, for ourselfs, our component inside of it.
               */
              Object
                .keys(this.state.fishes)
                .map(key => <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          fishes={this.state.fishes}
          loadSamples={this.loadSamples}
          />
      </div>
    );
  }

  /**
   * @ Component life cycle events
   *
   * NOTE:
   * 1. This event is fired once before the component rendering.
   * 2. Here we sync the app state with the firebase state.
   */
  componentWillMount() {
    /**
     * Gets the store ID from the URL param.
     */
    const storeId = this.props.params.storeId;

    /**
     * Sync the firebase state to the app state.
     */
    const model           = 'fishes';
    const databaseSchema  = `${storeId}/${model}`;
    const config          = {
      context: this,
      state: model
    };

    this.ref = base.syncState(databaseSchema, config);

    /**
     * Sync the state 'order' within the related local storage data if it exists.
     */
    const storage = {
      key: `order-${storeId}`
    };
    const order = localStorage.getItem(storage.key);

    if (order) {
      /**
       * Updates the component 'order' state with the data obtained from the local storage.
       */
      this.setState({
        order: JSON.parse(order)
      });
    }
  }

  /**
   * @ Component life cycle events
   *
   * NOTE:
   * 1. This event is fired once after a route changing.
   * 2. Here we remove the app state with the firebase state.
   */
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  /**
   * @ Component lyfe cycle events
   *
   * NOTE:
   * 1. This event will be fired everytime the 'props' and 'state' attributes of this component gets changed.
   * 2. We use it, at every 'order' change, we put it on the local storage to bind it again on page refresh.
   */
  componentWillUpdate(nextProps, nextState) {
    const storeId   = this.props.params.storeId;
    const order     = JSON.stringify(nextState.order);

    const storage   = {
      key: `order-${storeId}`,
      value: order
    };
    localStorage.setItem(storage.key, storage.value);
  }
}

export default App;
