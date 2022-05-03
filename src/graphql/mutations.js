/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSpecie = /* GraphQL */ `
  mutation CreateSpecie(
    $input: CreateSpecieInput!
    $condition: ModelSpecieConditionInput
  ) {
    createSpecie(input: $input, condition: $condition) {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const updateSpecie = /* GraphQL */ `
  mutation UpdateSpecie(
    $input: UpdateSpecieInput!
    $condition: ModelSpecieConditionInput
  ) {
    updateSpecie(input: $input, condition: $condition) {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const deleteSpecie = /* GraphQL */ `
  mutation DeleteSpecie(
    $input: DeleteSpecieInput!
    $condition: ModelSpecieConditionInput
  ) {
    deleteSpecie(input: $input, condition: $condition) {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const createPlant = /* GraphQL */ `
  mutation CreatePlant(
    $input: CreatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    createPlant(input: $input, condition: $condition) {
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
export const updatePlant = /* GraphQL */ `
  mutation UpdatePlant(
    $input: UpdatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    updatePlant(input: $input, condition: $condition) {
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
export const deletePlant = /* GraphQL */ `
  mutation DeletePlant(
    $input: DeletePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    deletePlant(input: $input, condition: $condition) {
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
