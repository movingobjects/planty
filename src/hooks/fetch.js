import { useCallback } from 'react';
import { API, Storage } from 'aws-amplify';
import {
  listSpecies,
  listPlants,
  getUser
} from 'graphql/queries';
import { createUser } from 'graphql/mutations';

export function useFetchUser(authUser) {

  const fetchUser = useCallback(async () => {

    const {
      username: userId,
      attributes: {
        email
      }
    } = authUser;

    const apiData = await API.graphql({
      query: getUser,
      variables: {
        id: userId
      }
    });
    const savedUser = apiData.data.getUser;

    if (savedUser) {
      return Promise.resolve(savedUser);

    } else {
      await API.graphql({
        query: createUser,
        variables: {
          input: {
            id: userId,
            firstName: email.split('@')[0],
            email: email
          }
        }
      });
      fetchUser();

    }

  }, [ authUser ]);

  return fetchUser;

}

export function useFetchPlants(user) {

  const fetchPlants = useCallback(async () => {

    const apiData = await API.graphql({
      query: listPlants,
      variables: {
        filter: {
          userId: {
            eq: user?.id
          }
        }
      }
    });
    const plantsFromAPI = apiData.data.listPlants.items;

    await Promise.all(plantsFromAPI.map(async plant => {
      if (plant.image) {
        const image = await Storage.get(plant.image);
        plant.image = image;
      }
      return plant;
    }))

    const items = apiData.data.listPlants.items
      .sort((a, b) => a.name.localeCompare(b.name));

    return Promise.resolve(items);

  }, [ user ]);

  return fetchPlants;

}

export function useFetchSpecies() {

  const fetchSpecies = useCallback(async () => {

    const apiData = await API.graphql({
      query: listSpecies
    });

    const items = apiData.data.listSpecies.items
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    return Promise.resolve(items);

  }, [ ]);

  return fetchSpecies;

}
