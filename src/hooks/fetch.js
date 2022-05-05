import { useCallback } from 'react';
import { API, Storage } from 'aws-amplify';

import {
  listSpecies,
  listPlants,
  getUser
} from 'graphql/queries';
import { createUser } from 'graphql/mutations';
import { sortByDateNextWater } from 'utils';

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
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    const savedUser = apiData.data.getUser;

    if (savedUser) {

      if (!!savedUser.profileImg?.length) {
        savedUser.profileImg = await Storage.get(savedUser.profileImg);
      }

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
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
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
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    const rawPlants = apiData.data.listPlants.items;

    await Promise.all(rawPlants.map(async (plant) => {
      if (plant.image) {
        plant.image = await Storage.get(plant.image);
      }
      return plant;
    }));

    const items = apiData.data.listPlants.items
      .sort(sortByDateNextWater);

    return Promise.resolve(items);

  }, [ user ]);

  return fetchPlants;

}

export function useFetchSpecies() {

  const fetchSpecies = useCallback(async () => {

    const apiData = await API.graphql({
      query: listSpecies,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    const items = apiData.data.listSpecies.items
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    return Promise.resolve(items);

  }, [ ]);

  return fetchSpecies;

}
