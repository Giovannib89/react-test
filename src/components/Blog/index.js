import React, { useState } from 'react';
// on import redirect dans react router dom
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
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

        {/* Redirect permet de rediriger vers un composant Route
        qui aura le path préciser dans la prop "to" */}
        <Redirect from="/jquery" to="/react" />

        <Route><NotFound /></Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Blog;
