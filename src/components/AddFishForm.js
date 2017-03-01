/**
 * @ Libs
 */
import React from 'react';

/**
 * @ Class
 */
class AddFishForm extends React.Component {
  createFish(event) {
    event.preventDefault();
    console.log('AddFishForm.createFish()');

    const name        = this.name.value;
    const price       = this.price.value;
    const status      = this.status.value;
    const description = this.description.value;
    const image       = this.image.value;

    const fish = {
      name: name,
      price: price,
      status: status,
      description: description,
      image: image
    };

    this.props.addFish(fish);
    this.form.reset();
  }

  render() {
    return (
      <form ref={(element) => this.form = element} className='fish-edit' onSubmit={(event) => this.createFish(event)}>
        <input ref={(element) => this.name = element} type='text' placeholder='Fish name' />
        <input ref={(element) => this.price = element} type='text' placeholder='Fish price' />
        <select ref={(element) => this.status = element} >
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold out!</option>
        </select>
        <textarea ref={(element) => this.description = element} placeholder='Fish description' />
        <input ref={(element) => this.image = element} type='text' placeholder='Fish image' />

        <button type='submit'>+ Add item</button>
      </form>
    );
  }
}

export default AddFishForm;
