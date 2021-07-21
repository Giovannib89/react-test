import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// on importe axios de axios
import axios from 'axios';

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

  const [loading, setLoading] = useState(false);

  // on rajoute une entrée au state pour la gestion des erreurs
  const [hasError, setHasError] = useState(false);

  const [posts, setPosts] = useState([]);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  const getPostsByCategory = (category, postsList) => {
    if (category === 'Accueil') {
      return postsList;
    }
    const filteredPosts = postsList.filter((post) => post.category === category);
    return filteredPosts;
  };

  const loadData = () => {
    setLoading(true);

    // on remet le status d'erreur à false
    setHasError(false);

    //! pour tester tu peux effacer une lettre dans l'url pour créer l'érreur et voir le résulta
    axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
      .then((response) => {
        // réponse en succès
        // axios nous renvoie un objet qui structure la réponse
        console.log(response);
        // une fois la réponse obtenue, on vient mettre les données dans le state
        setPosts(response.data);
      })
      .catch((error) => {
        // erreur
        console.log(error);
        setHasError(true);
      })
      .finally(() => {
        // always executed
        console.log('toujours exécuté');
        // ici je viens retirer le status de loading
        setLoading(false);
      });
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />
      <button type="button" onClick={loadData}>Load Data</button>
      {loading && <Spinner />}

      {/* si hasError et sur true alors message d'erreur s'affiche */}
      {hasError && <div>Une erreur s'est produite</div>}

      {/* pour que la page s'affiche correctement il faut que 
      loading et sur false et hasError aussi */}
      {!loading && !hasError && (
      <Switch>
        {categoriesData.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
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
