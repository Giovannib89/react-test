import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import './styles.scss';

const Post = ({ category, excerpt, title }) => {
  const createMarkup = (text) => {
    const cleanText = DOMPurify.sanitize(text, { ALLOWED_TAGS: ['em', 'strong'] });

    return { __html: cleanText };
  };

  return (
    <article className="post">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p
        className="post-excerpt"
        dangerouslySetInnerHTML={createMarkup(excerpt)}
      />
    </article>
  );
};

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default Post;
