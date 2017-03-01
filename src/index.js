/**
 * Libs
 */
import React from 'react';
import ReactDOM from 'react-dom'; // import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

/**
 * @ Components
 */
import App          from './components/App';
import NotFound     from './components/NotFound';
import StorePicker  from './components/StorePicker';

/**
 * Vendor
 */
import './css/style.css';

/**
 * Main
 */
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={StorePicker}/>
        <Match pattern='/store/:storeId' component={App}/>
        <Miss component={NotFound}/>
      </div>
    </BrowserRouter>
  );
};

const component = <Root/>;
const target    = document.querySelector('#main');
ReactDOM.render(component, target);
