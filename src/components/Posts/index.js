import React from 'react';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import './styles.scss';

const Posts = ({ posts, isZen }) => (
  <main className={`posts ${isZen ? 'posts--zen' : ''}`}>
    <h1 className="posts-title">Dev Of Thrones</h1>
    <div className="posts-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          // plutôt que venir mettre chaque propriété de l'objet
          // dans une props, on utilise le spread operator
          {...post}
          // category={post.category}
          // title={post.title}
          // excerpt={post.excerpt}
        />
      ))}
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  isZen: PropTypes.bool.isRequired,
};

export default Posts;
