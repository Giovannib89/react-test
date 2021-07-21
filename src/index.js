import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Blog from 'src/components/Blog';

// pour avoir toutes les outils/objets de react-router-dom dans l'application
// on englobe le composant racine avec le composant BrowserRouter fournit pour react-router-dom
// les objets de react-router-dom sont
// history: interface de l'objet history du navigateur
// location: version simplifiée de l'objet location du navigateur
// match: objet de vérification de l'url courante avec les données du router
// pour intéragir avec ces objets il va falloir utiliser des outils/composants
// de react-router-dom
const rootComponent = (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
);

const target = document.getElementById('root');

render(rootComponent, target);
