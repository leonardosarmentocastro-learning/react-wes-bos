/**
 * @ Libs
 */
import React from 'react';

/**
 * @ Componenets
 */
import AddFishForm from './AddFishForm';

/**
 * @ Class
 */
class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {
          /**
           * NOTE:
           * Since we are using the `addFish` method from the `App.js`, and
           * sharing it accross different components, this can only be made by
           * sharing 'properties'(`props`) between them.
           *
           * Thats why `this.props.addFish` instead of `this.addFish`.
           */
        }
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    );
  }
}

export default Inventory;
