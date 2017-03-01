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
  constructor() {
    super();
    this.renderInventory  = this.renderInventory.bind(this);
    this.handleChange     = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const element           = e.target;
    const fishBeforeUpdate  = this.props.fishes[key];

    const updatedFish = {
      ...fishBeforeUpdate,
      [element.name]: element.value
    };

    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div className='fish-edit' key={key}>
        <input name='name' value={fish.name} type='text' placeholder='Fish name'
          onChange={(e) => this.handleChange(e, key)} />
        <input name='price' value={fish.price} type='text' placeholder='Fish price'
          onChange={(e) => this.handleChange(e, key)} />
        <select name='status' value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold out!</option>
        </select>
        <textarea name='description' value={fish.description} placeholder='Fish description'
          onChange={(e) => this.handleChange(e, key)} />
        <input name='image' value={fish.image} type='text' placeholder='Fish image'
          onChange={(e) => this.handleChange(e, key)} />

        <button onClick={() => this.props.removeFish(key)}>Remove fish</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {
          /**
           * Editable add fish forms.
           */

          Object
            .keys(this.props.fishes)
            .map(this.renderInventory)
        }

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
