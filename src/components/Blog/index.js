import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  // on passe manuellement loading a false
  const [loading, setLoading] = useState(false);

  // on stocke désormais les données des posts dans le state
  const [posts, setPosts] = useState([]);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  // on change posts en postList
  const getPostsByCategory = (category, postsList) => {
    if (category === 'Accueil') {
      return postsList;
    }
    // ici aussi
    const filteredPosts = postsList.filter((post) => post.category === category);
    return filteredPosts;
  };

  // création d'une fonction qui va permettre par la suite d'aller chercher
  // les données d'une API
  const loadData = () => {
    // on met le spinner en route
    setLoading(true);

    // on simule le chargement
    setTimeout(() => {
      // on arrête le spinner
      setLoading(false);
      // on vient remplir le state avec les données en local
      setPosts(postsData);
    }, 2000);
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />
      {/* au click on lance la fonction loaddata qui va lancer le spinner 
      pendant 3 seconde et ensuite afficher les datas */}
      <button type="button" onClick={loadData}>Load Data</button>
      {loading && <Spinner />}

      {!loading && (
      <Switch>
        {categoriesData.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
            {/* on retire postData et on place le state posts  */}
            <Posts posts={getPostsByCategory(label, posts)} isZen={zenMode} />
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
