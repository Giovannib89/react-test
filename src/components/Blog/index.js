// on ajoute à l'import useEffect de react
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
import './styles.scss';

const Blog = () => {
  //! ATTENTION :
  // - les hooks ne s'utilisent que dans les composants fonction
  // - les méthode de lifecycle(cDM, cDU et cWU) ne sont pas disponibles dans un composant fonction

  const [zenMode, setZenMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [posts, setPosts] = useState([]);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  const getPostsByCategory = (category, postsList) => {
    if (category === 'Accueil') {
      return postsList;
    }
    const filteredPosts = postsList.filter((post) => post.category === category);
    return filteredPosts;
  };

  const loadData = async () => {
    console.log('loadData');

    setLoading(true);

    setHasError(false);

    try {
      const { data } = await axios.get('https://oclock-open-apis.vercel.app/api/blog/posts');
      setPosts(data);
    }
    catch (error) {
      setHasError(true);
    }
    finally {
      setLoading(false);
    }
  };

  // pour exécuter la fonction loadData au 1e rendu du composant, on pouvait le faire
  // avec la méthode de lifecycle des class componentDidMount

  // ici on donne à useEffect un callback qui sera exécuté
  // au 1e rendu du composant et à chaque update
  // => componentDidMount + componentDidUpdate
  // //? useEffect(() => {
  //   //? console.log('1e rendu et update du composant');
  //   //? loadData(); => on part en boucle
  // //? });

  // callback exécuté uniquement au 1e rendu du composant
  // il faut mettre un tableau vide en 2e argument de useEffect
  // => componentDidMount
  // //? useEffect(() => {
  //   //? console.log('1e rendu uniquement');
  //   //? loadData();
  // //? }, []);

  // callback passé à useEffect sera exécuté au 1e rendu et à l'update du composant
  // SI la valeur de zenMode change. Pour cela on vient placer la valeur à surveiller
  // dans le tableau de dépendance en 2e argument

  // => componentDidMount + componentDidUpdate avec condition
  // //? useEffect(() => {
  //   //? console.log('1e rendu et quand la valeur de loading change');
  //   //? loadData(); => quand zenMode change, on relance loadData : pas bon
  // //? }, [zenMode]);

  // //? useEffect(() => {
  //   //?   loadData();
  // //? }, []);

  // ici on a juste l'exécution de la fonction loadData dans le callback
  // on peut donc passer directement loadData à useEffect
  // on met un tableau vide en 2e argument pour charger les données uniquement au 1e rendu
  useEffect(loadData, []);

  //! Pour tester dans le navigateur aller dans NetWork et passer "No throttling" à "slow 3G"
  //! pour pouvoir voir le spinner et les data arriver

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        onClickZenButton={toggleZenMode}
        isZen={zenMode}
      />
      {/* ici on supprime le bouton qui nous servait de simulateur */}
      {loading && <Spinner />}

      {hasError && <div>Une erreur s'est produite</div>}

      {!loading && !hasError && (
      <Switch>
        {categoriesData.map(({ route, label }) => (
          <Route
            key={label}
            exact
            path={route}
          >
            <Posts posts={getPostsByCategory(label, posts)} isZen={zenMode} />
          </Route>
        ))}
        <Route path="/angular">Ne s'affiche pas</Route>

        <Redirect from="/jquery" to="/react" />

        <Route><NotFound /></Route>
      </Switch>
      )}
      <Footer />
    </div>
  );
};

export default Blog;
