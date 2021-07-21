import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export default function Single({ posts }) {
  const { slug } = useParams();
  const { title, category, content } = posts.find((post) => post.slug === slug);

  return (
    <article className="post post--single">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p>{content}</p>
    </article>
  );
}

Single.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};
