import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import Single from 'src/components/Single';

import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  // on passe loading a true pour pouvoir faire
  // le chargement en arrivant sur le site pour évité le bug
  const [loading, setLoading] = useState(true);

  const [hasError, setHasError] = useState(false);

  const [posts, setPosts] = useState([]);

  const [categories, setCategories] = useState([]);

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

  const loadData = async () => {
    // on retire setLoading car il est fait au lancement du site
    // setLoading(true);

    setHasError(false);

    try {
      const { data: postsData } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/posts');
      setPosts(postsData);

      const { data: categoriesData } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/categories');
      setCategories(categoriesData);
    }
    catch (error) {
      setHasError(true);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(loadData, []);

  return (
    <div className="blog">
      <Header
        categories={categories}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />

      {loading && <Spinner />}

      {hasError && <div>Une erreur s'est produite</div>}

      {!loading && !hasError && (
      <Switch>
        {categories.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
            <Posts posts={getPostsByCategory(label, posts)} isZen={zenMode} />
          </Route>
        ))}

        <Route path="/post/:slug">
          {/* on ajoute le props contenant l'ensemble des data des post */}
          <Single posts={posts} />
        </Route>

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
