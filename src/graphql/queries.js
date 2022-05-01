/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      plants {
        items {
          id
          userId
          specieId
          name
          image
          createdAt
          updatedAt
          userPlantsId
        }
        nextToken
      }
      createdAt
      updatedAt
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
        plants {
          nextToken
        }
        createdAt
        updatedAt
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
        plants {
          nextToken
        }
        createdAt
        updatedAt
      }
      specieId
      specie {
        id
        commonName
        scientificName
        createdAt
        updatedAt
      }
      name
      image
      createdAt
      updatedAt
      userPlantsId
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
          createdAt
          updatedAt
        }
        specieId
        specie {
          id
          commonName
          scientificName
          createdAt
          updatedAt
        }
        name
        image
        createdAt
        updatedAt
        userPlantsId
      }
      nextToken
    }
  }
`;
