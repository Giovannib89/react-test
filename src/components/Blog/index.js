import React, { useState } from 'react';
// ajout de l'import Switch dans react-router-dom
import { Route, Switch } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
// importation du composant NotFound
import NotFound from 'src/components/NotFound';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  const getPostsByCategory = (category, posts) => {
    if (category === 'Accueil') {
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
      {/*
        Switch permet d'afficher le 1e composant Route
        dont le path correspondra avec le pathname de l'url
       */}
      <Switch>
        {/*
          ici on génère un composant Route par catégorie
          pour chacun de ses composants, on va mettre en enfant
          un composant "Posts" avec en props "posts" une liste
          filtrée de postsData. Filtrée en fonction de category.label
        */}
        {categoriesData.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
            <Posts posts={getPostsByCategory(label, postsData)} isZen={zenMode} />
          </Route>
        ))}
        {/* ce composant Route ne s'affichera jamais, il y en a un avant lui */}
        <Route path="/angular">Ne s'affiche pas</Route>

        {/* si on veut mettre en place une 404, on ajoute
        une composant Route sans props "path" à la fin d'un Switch */}
        <Route><NotFound /></Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Blog;
