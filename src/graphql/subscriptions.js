/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSpecie = /* GraphQL */ `
  subscription OnCreateSpecie {
    onCreateSpecie {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSpecie = /* GraphQL */ `
  subscription OnUpdateSpecie {
    onUpdateSpecie {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSpecie = /* GraphQL */ `
  subscription OnDeleteSpecie {
    onDeleteSpecie {
      id
      commonName
      scientificName
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlant = /* GraphQL */ `
  subscription OnCreatePlant {
    onCreatePlant {
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
export const onUpdatePlant = /* GraphQL */ `
  subscription OnUpdatePlant {
    onUpdatePlant {
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
export const onDeletePlant = /* GraphQL */ `
  subscription OnDeletePlant {
    onDeletePlant {
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
