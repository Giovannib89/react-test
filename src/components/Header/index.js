import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories, onClickZenButton, isZen }) => (
  <header className="menu">
    <nav>
      {categories.map(({ route, label }) => (
        // Link va nous permettre de modifier notre historique
        // de navigation, pour cela il utilise l'objet history
        // du react-router-dom
        // NavLink nous permet d'avoir des Link spéciaux pour les menus
        // il permet d'avoir une class CSS active quand la props "to"
        // correspond avec le path de l'url
        // on peut lui préciser le nom de la classe avec activeClassName
        // on peut lui préciser si le path doit correspondre "exactement" avec la prop "to"
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
        {`${isZen ? 'Désactiver' : 'Activer'} le mode zen`}
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
