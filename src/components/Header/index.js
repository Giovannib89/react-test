import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

// on récupére isZen et on lui ajoute ces propTypes
const Header = ({ categories, onClickZenButton, isZen }) => (
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
        {/* A la place de "Activer le mode zen"qui est en dur
        on place une ternaire qui va afficher correctement le texte du bouton */}
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
  // ajout des proptypes , de types booléan
  isZen: PropTypes.bool.isRequired,
};

export default Header;
