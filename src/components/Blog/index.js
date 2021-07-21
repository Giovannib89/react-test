import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
// import du composant Spinner
import Spinner from 'src/components/Spinner';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  // on prépare une nouvelle dans le state pour gérer l'état de loading
  //! change true en false pour voir le résultat
  // ou dans le navigateur dans components au niveau de Blog décoche le hooks sur true
  const [loading, setLoading] = useState(true);

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
      {/* ajout d'un bouton qui permet d'envoyer les donnés */}
      <button type="button" onClick={() => console.log('je veux charger les données')}>Load Data</button>
      {/* quand loading est true ça lance le spinner */}
      {loading && <Spinner />}

      {/* lorsque loading passe a false affichage des article */}
      {!loading && (
      <Switch>
        {categoriesData.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
            <Posts posts={getPostsByCategory(label, postsData)} isZen={zenMode} />
          </Route>
        ))}
        <Route path="/angular">Ne s'affiche pas</Route>

        <Redirect from="/jquery" to="/react" />

        <Route><NotFound /></Route>
      </Switch>
      )}
      <Footer />
    </div>
  );
};

export default Blog;
