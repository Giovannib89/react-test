import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories, onClickZenButton, isZen }) => (
  <header className="menu">
    <nav>
      {categories.map(({ route, label }) => (
        <NavLink
          key={route}
          className="menu-link"
          to={route}
          activeClassName="menu-link--selected"
          exact
        >
          {label}
        </NavLink>
      ))}
      <button
        className="menu-btn"
        type="button"
        onClick={onClickZenButton}
      >
        {/* © François */}
        {isZen ? 'Désactiver' : 'Activer'} le mode zen
      </button>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onClickZenButton: PropTypes.func.isRequired,
  isZen: PropTypes.bool.isRequired,
};

export default Header;
