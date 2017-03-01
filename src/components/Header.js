import React from 'react';

/**
 * @ Stateless function/component
 *
 * NOTE: Since this component doesn't have any other functionality attached to it
 * rather than only rendering the header, we can remove the others `React.Component`
 * aspects from it and leave it as a "stateless function".
 */
const Header = (props) => {
  /**
   * @ Props
   */
  const tagline = props.tagline;

  /**
   * @ Template
   */
  return (
    <header className='top'>
      <h1>
        Catch
        <span className='ofThe'>
          <span className='of'>of</span>
          <span className='the'>the</span>
        </span>
        Day
      </h1>
      <h3 className='tagline'>
        <span>{tagline}</span>
      </h3>
    </header>
  );
}

export default Header;
