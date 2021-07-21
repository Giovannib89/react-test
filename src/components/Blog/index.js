// suppression de useEffect
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// suppression de axios
// import axios from 'axios';

// création du dossier hook dans src et import
import { useLoadData } from 'src/hooks';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import Single from 'src/components/Single';

import './styles.scss';

const Blog = () => {
  // mise en place des hooks custom
  const [posts, postsLoading, postsError] = useLoadData('https://oclock-open-apis.vercel.app/api/blog/posts');
  const [categories, categoriesLoading, categoriesError] = useLoadData('https://oclock-open-apis.vercel.app/api/blog/categories');

  const [zenMode, setZenMode] = useState(false);

  // ! Suppression des useState car déplacer dans dossier hook
  // const [loading, setLoading] = useState(true);

  // const [hasError, setHasError] = useState(false);

  // const [posts, setPosts] = useState([]);

  // const [categories, setCategories] = useState([]);

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

  //! Déplacement de loadata dans le dossier hook
  // const loadData = async () => {
  //   setHasError(false);

  //   try {
  //     const { data: postsData } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/posts');
  //     setPosts(postsData);

  //     const { data: categoriesData } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/categories');
  //     setCategories(categoriesData);
  //   }
  //   catch (error) {
  //     setHasError(true);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(loadData, []);

  // const qui va distribuer les data ou les erreur en fonction de la demande
  const isLoading = categoriesLoading || postsLoading;
  const hasError = categoriesError || postsError;

  return (
    <div className="blog">
      <Header
        categories={categories}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />

      {/* modif de loading en isLoading */}
      {isLoading && <Spinner />}

      {/* aucune modif car on a garder le méme nom */}
      {hasError && <div>Une erreur s'est produite</div>}

      {!isLoading && !hasError && (
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
