// == Import
import React, { useState } from 'react';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  // création d'une fonction qui va changer zenMode du true a false et inversement
  const toggleZenMode = () => {
    // on utilise setZenMode du useState et on lui met en parametre !zenMode pour avoir l'inverse
    setZenMode(!zenMode);
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        // on ajoute une props onClickZenButton qui contient
        //  la fonction qui va faire varier le state
        onClickZenButton={toggleZenMode}
      />
      <Posts posts={postsData} isZen={zenMode} />
      <Footer />
    </div>
  );
};

export default Blog;
