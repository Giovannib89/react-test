import React from 'react';
// on importe proptypes
import PropTypes from 'prop-types';
//  on importe useParams de react-router-dom
import { useParams } from 'react-router-dom';

export default function Single({ posts }) {
  // grâce à useParams on peut récupérer l'objet params de react-router-dom
  // on va s'en servir pour récupérer l'article de nos données qui aura le même slug
  // on destructure directement useParam()
  const { slug } = useParams();
  // on peut destructurer egalement le find
  const { title, category, content } = posts.find((post) => post.slug === slug);

  return (
    // on replace les données en dur avec le resultat de find
    <article className="post post--single">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p>{content}</p>
    </article>
  );
}

// on spécifie les prop types des element de la props posts
Single.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};
