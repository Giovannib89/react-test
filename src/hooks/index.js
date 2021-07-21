/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import axios from 'axios';

// par convention, les custom hooks sont préfixé avec le mot "use"
export function useLoadData(url) {
  // ici on va placer la logique de chargement de données avec les hooks

  // on prévoit de rajouter une entrée dans le state qui sera un tableau par défaut
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(true);

  // ici on va avoir la logique de chargement des données
  useEffect(() => {
    setHasError(false);

    axios.get(url)
      .then((response) => {
        // réponse en succès
        // axios nous renvoie un objet qui structure la réponse
        // console.log(response);
        // une fois la réponse obtenue, on vient mettre les données dans le state
        setItems(response.data);
      })
      .catch((error) => {
        // erreur
        console.log(error);
        setHasError(true);
      })
      .finally(() => {
        // always executed
        console.log('toujours exécuté');
        // ici je viens retirer le status de loading
        setLoading(false);
      });
  }, []);
  // et on va retourner les items une fois le chargement effectué
  return [items, loading, hasError];
}