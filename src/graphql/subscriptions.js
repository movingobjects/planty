/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUserChange = /* GraphQL */ `
  subscription OnUserChange {
    onUserChange {
      id
      email
      firstName
      lastName
      profileImg
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      firstName
      lastName
      profileImg
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
      profileImg
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
      profileImg
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
        profileImg
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
      source
      dateBorn
      dateNextWater
      dateRetired
      waterings {
        date
      }
      createdAt
      updatedAt
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
        profileImg
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
      source
      dateBorn
      dateNextWater
      dateRetired
      waterings {
        date
      }
      createdAt
      updatedAt
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
        profileImg
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
      source
      dateBorn
      dateNextWater
      dateRetired
      waterings {
        date
      }
      createdAt
      updatedAt
    }
  }
`;
