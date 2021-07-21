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

  // Création d'une fonction qui va perméttre de faire le trie des data en fonction
  // de la route , il récupére en paramétre "category.label" ligne 57
  const getPostsByCategory = (category) => {
    console.log(category);
    // eslint-disable-next-line arrow-body-style
    const filteredPosts = postsData.filter((post) => {
      return post.category === category;
    });

    console.log(filteredPosts);
    return filteredPosts;
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />
      {/*
        Route est un composant de react-router-dom
        qui va nous permettre d'afficher du contenu en fonction de l'url
        quand le pathname de l'url correspond à la props "path" il affiche
        ses enfants
      */}

      {/*
        ici on génère un composant Route par catégorie
        pour chacun de ses composants, on va mettre en enfant
        un composant "Posts" avec en props "posts" une liste
        filtrée de postsData. Filtrée en fonction de category.label
      */}
      {/* eslint-disable-next-line arrow-body-style */}
      {categoriesData.map((category) => {
        return (
          <Route exact path={category.route}>
            <Posts posts={getPostsByCategory(category.label)} isZen={zenMode} />
          </Route>
        );
      })}
      <Footer />
    </div>
  );
};

export default Blog;
