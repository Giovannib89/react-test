import React from 'react';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import './styles.scss';

const Posts = ({ post }) => (
  <main className="posts">
    <h1 className="posts-title">Dev Of Thrones</h1>
    <div className="posts-list">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  })).isRequired,
};

export default Posts;
