import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
// import de Link dans react-router-dom
import { Link } from 'react-router-dom';

import './styles.scss';

// ajout de la props slug au composant post
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

  //! Test= appuis sur un article pour étre redirigé vers une page 404
  // link va permetre de créer une nouvelle route 
  // ainsi que de transformé les article en lien clicable 
  // pour afficher par la suite le composant single
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
