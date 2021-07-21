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

  const [loading, setLoading] = useState(false);

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

    setTimeout(() => {
      setLoading(false);
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
