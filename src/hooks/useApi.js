import { API, Storage } from 'aws-amplify';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import * as atoms from 'atoms';
import { createUser } from 'graphql/mutations';
import * as mutations from 'graphql/mutations';
import {
  getUser,
  listPlants,
  listRooms,
  listSpecies
} from 'graphql/queries';
import useStorage from 'hooks/useStorage';
import { getImagePath, sortByDateNextWater } from 'utils';

export default function useApi() {
  const { uploadFile } = useStorage();

  const setUser = useSetAtom(atoms.user);
  const setRooms = useSetAtom(atoms.rooms);
  const setSpecies = useSetAtom(atoms.species);
  const setPlants = useSetAtom(atoms.plants);

  const authUser = useAtomValue(atoms.authUser);
  const user = useAtomValue(atoms.user);

  // User

  const fetchUser = useCallback(async () => {
    if (!authUser) return null;

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
      if (savedUser.profileImg?.length) {
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
            email
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      return fetchUser();
    }
  }, [authUser]);

  const updateUser = async (data) => {
    const hasNewImage = !!data?.profileImg?.name?.length;

    if (hasNewImage) {
      data.profileImg = await uploadFile(
        data?.profileImg,
        getImagePath('users', data?.profileImg, data?.id)
      );
    } else {
      delete data.profileImg;
    }

    await API.graphql({
      query: mutations.updateUser,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchUser().then((result) => setUser(result));
  };

  // Rooms

  const fetchRooms = useCallback(async () => {
    const apiData = await API.graphql({
      query: listRooms,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    const items = apiData.data.listRooms.items
      .sort((a, b) => a.name.localeCompare(b.name));

    return Promise.resolve(items);
  }, []);

  const createRoom = async (data) => {
    await API.graphql({
      query: mutations.createRoom,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchRooms().then((result) => setRooms(result));
  };
  const updateRoom = async (data) => {
    await API.graphql({
      query: mutations.updateRoom,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchRooms().then((result) => setRooms(result));
  };
  const deleteRoom = async (id) => {
    await API.graphql({
      query: mutations.deleteRoom,
      variables: {
        input: {
          id
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchRooms().then((result) => setRooms(result));
  };

  // Species

  const fetchSpecies = useCallback(async () => {
    const apiData = await API.graphql({
      query: listSpecies,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    const items = apiData.data.listSpecies.items
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    return Promise.resolve(items);
  }, []);

  const createSpecie = async (data) => {
    await API.graphql({
      query: mutations.createSpecie,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchSpecies().then((result) => setSpecies(result));
  };
  const updateSpecie = async (data) => {
    await API.graphql({
      query: mutations.updateSpecie,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchSpecies().then((result) => setSpecies(result));
  };
  const deleteSpecie = async (id) => {
    await API.graphql({
      query: mutations.deleteSpecie,
      variables: {
        input: {
          id
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchSpecies().then((result) => setSpecies(result));
  };

  // Plants

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
  }, [user]);

  const createPlant = async (data) => {
    const hasNewImage = !!data?.image?.name?.length;

    if (hasNewImage) {
      data.image = await uploadFile(
        data?.image,
        getImagePath('plants', data?.image, data?.id)
      );
    }

    await API.graphql({
      query: mutations.createPlant,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchPlants().then((result) => setPlants(result));
  };

  const updatePlant = async (data) => {
    const hasNewImage = !!data?.image?.name?.length;

    if (hasNewImage) {
      data.image = await uploadFile(
        data?.image,
        getImagePath('plants', data?.image, data?.id)
      );
    } else {
      delete data.image;
    }

    await API.graphql({
      query: mutations.updatePlant,
      variables: {
        input: data
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchPlants().then((result) => setPlants(result));
  };

  const deletePlant = async (id) => {
    await API.graphql({
      query: mutations.deletePlant,
      variables: {
        input: {
          id
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchPlants().then((result) => setPlants(result));
  };

  return {
    fetchUser,
    updateUser,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    fetchSpecies,
    createSpecie,
    updateSpecie,
    deleteSpecie,
    fetchPlants,
    createPlant,
    updatePlant,
    deletePlant
  };
}