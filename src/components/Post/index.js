/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

import './styles.scss';

const Post = ({
  category,
  excerpt,
  title,
  slug,
}) => {
  const createMarkup = (text) => {
    const cleanText = DOMPurify.sanitize(text, { ALLOWED_TAGS: ['em', 'strong'] });

    return { __html: cleanText };
  };

  return (
    <Link to={`/post/${slug}`} className="post">
      <article>
        <h2 className="post-title">{title}</h2>
        <div className="post-category">{category}</div>
        <p
          className="post-excerpt"
          dangerouslySetInnerHTML={createMarkup(excerpt)}
        />
      </article>
    </Link>
  );
};

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  // ajout de slug dans les prop types en string
  slug: PropTypes.string.isRequired,
};

export default Post;
