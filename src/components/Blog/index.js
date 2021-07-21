// == Import
import React, { useState } from 'react';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
const Blog = () => {
  /**
   * useState
   * c'est le hook d'état
   * il permet de rajouter un state à un composant fonction
   * c'est une fonction, qui retourne un tableau
   * dans le tableau on a 2 éléments
   * - en index 0 la nouvelle entrée du state : undefined par défaut
   * - en index 1 on a une fonction qui nous permettra de changer la nouvelle entrée du state
   *
   * si je passe un argument à useState, ce sera pris comme valeur par défaut
   * pour l'élément en index 0 du tableau
   * et cette valeur sera prise en compte pour la nouvelle propriété du State
   */
  // const stateTest = useState(12);
  // const test = stateTest[0];
  // const setTest = stateTest[1];

  // const [test, setTest] = useState(15);
  // const [donnée, modifierLaDonnée] = useState(valeur de départ);

  const [zenMode, setZenMode] = useState(false);

  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <Posts posts={postsData} isZen={zenMode} />
      <Footer />
    </div>
  );
};

// == Export
export default Blog;
