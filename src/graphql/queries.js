/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      profileImg
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        firstName
        lastName
        profileImg
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSpecie = /* GraphQL */ `
  query GetSpecie($id: ID!) {
    getSpecie(id: $id) {
      id
      commonName
      scientificName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSpecies = /* GraphQL */ `
  query ListSpecies(
    $filter: ModelSpecieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        commonName
        scientificName
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPlant = /* GraphQL */ `
  query GetPlant($id: ID!) {
    getPlant(id: $id) {
      id
      userId
      user {
        id
        email
        firstName
        lastName
        profileImg
        createdAt
        updatedAt
        owner
      }
      specieId
      specie {
        id
        commonName
        scientificName
        createdAt
        updatedAt
        owner
      }
      name
      image
      source
      dateBorn
      dateNextWater
      dateRetired
      waterings {
        date
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPlants = /* GraphQL */ `
  query ListPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        user {
          id
          email
          firstName
          lastName
          profileImg
          createdAt
          updatedAt
          owner
        }
        specieId
        specie {
          id
          commonName
          scientificName
          createdAt
          updatedAt
          owner
        }
        name
        image
        source
        dateBorn
        dateNextWater
        dateRetired
        waterings {
          date
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
