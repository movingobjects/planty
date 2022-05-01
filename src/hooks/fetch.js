import { useCallback } from 'react';
import { API } from 'aws-amplify';
import {
  listSpecies,
  listPlants,
  getUser
} from 'graphql/queries';
import { createUser } from 'graphql/mutations';
import { useStorage } from 'hooks/storage';

export function useFetchUser(authUser) {

  const { getFilePath } = useStorage();

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

      if (!!savedUser.profileImg?.length) {
        savedUser.profileImg = await getFilePath(savedUser.profileImg);
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
        }
      });
      fetchUser();

    }

  }, [ authUser ]);

  return fetchUser;

}

export function useFetchPlants(user) {

  const { getFilePath } = useStorage();

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
    const rawPlants = apiData.data.listPlants.items;

    await Promise.all(rawPlants.map(async (plant) => {
      if (plant.image) {
        plant.image = await getFilePath(plant.image);
      }
      return plant;
    }));

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
