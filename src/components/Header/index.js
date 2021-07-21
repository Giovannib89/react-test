import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

// on récupére onClickZenButton et on lui ajoute ces propTypes
const Header = ({ categories, onClickZenButton }) => (
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
      <button
        className="menu-btn"
        type="button"
        // ajout de l'évent avec onClick qui va lancer le mode zen
        onClick={onClickZenButton}
      >
        Activer le mode zen
      </button>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  // ajout des proptypes , de types fonction
  onClickZenButton: PropTypes.func.isRequired,
};

export default Header;
