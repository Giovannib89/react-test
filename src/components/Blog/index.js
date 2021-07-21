import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

  // on place async
  const loadData = async () => {
    setLoading(true);

    setHasError(false);

    // on place le try catch
    try {
      // on place await devant la requete
      const { data } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/posts');
      setPosts(data);
    }
    catch (error) {
      // si on rentre dans le catch setHasError passe a true
      setHasError(true);
    }
    finally {
      // si tous ce passe bien on rentre dans le finally et
      // on fais passer le spinner a false pour l'arréter
      setLoading(false);
    }
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

      {hasError && <div>Une erreur s'est produite</div>}

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
