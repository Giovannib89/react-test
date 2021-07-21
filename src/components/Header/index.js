import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({ categories }) => (
  <header className="menu">
    <nav>
      {categories.map(({ route, label }) => (
        <a
          key={route}
          className="menu-link"
          href={route}
        >
          {label}
        </a>
      ))}
      {/* <a className="menu-link menu-link--selected" href="">Accueil</a>
      <a className="menu-link" href="">React</a>
      <a className="menu-link" href="">Angular</a> */}
      <button className="menu-btn" type="button">Activer le mode zen</button>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default Header;
