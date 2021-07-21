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

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />
      <Posts posts={postsData} isZen={zenMode} />
      <Footer />
    </div>
  );
};

export default Blog;
