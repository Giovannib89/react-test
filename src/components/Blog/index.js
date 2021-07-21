// == Import
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  // on ajoute la props posts qui va nous servir a afficher tout les article pour l'Accueil
  const getPostsByCategory = (category, posts) => {
    // on utilise un if qui dit si categori et egal a Accueil
    if (category === 'Accueil') {
      // alors nous envoyon tte les datas
      return posts;
    }

    const filteredPosts = posts.filter((post) => post.category === category);
    return filteredPosts;
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />

      {/* Ajout d'une key pour chaque route on utilise ici le label et on destructure catégori */}
      {categoriesData.map(({ route, label }) => (
        <Route
          key={label}
          exact
          path={route}
        >
          <Posts posts={getPostsByCategory(label, postsData)} isZen={zenMode} />
        </Route>
      ))}
      <Footer />
    </div>
  );
};

export default Blog;
