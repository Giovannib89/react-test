import React from 'react';
import PropTypes from 'prop-types';
// import de DOMPurify de dompurify
import DOMPurify from 'dompurify';

import './styles.scss';

const Post = ({ category, excerpt, title }) => {
  // on peut interpréter de l'HTML avec les composants React
  // il faut utiliser dangerouslySetInnerHTML et lui passer un objet
  // qui aura la propriété __html
  // ici on vient créer une fonction qui retourne cette objet
  const createMarkup = (text) => {
    // on en profite pour assainir l'HTML avec DOMPurify
    // on évite ainsi les attaques XSS (Cross-Site Scripting)
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
