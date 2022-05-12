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
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($owner: String) {
    onCreateRoom(owner: $owner) {
      id
      name
      level
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($owner: String) {
    onUpdateRoom(owner: $owner) {
      id
      name
      level
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($owner: String) {
    onDeleteRoom(owner: $owner) {
      id
      name
      level
      createdAt
      updatedAt
      owner
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
  subscription OnCreatePlant($owner: String) {
    onCreatePlant(owner: $owner) {
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
      roomId
      room {
        id
        name
        level
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePlant = /* GraphQL */ `
  subscription OnUpdatePlant($owner: String) {
    onUpdatePlant(owner: $owner) {
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
      roomId
      room {
        id
        name
        level
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePlant = /* GraphQL */ `
  subscription OnDeletePlant($owner: String) {
    onDeletePlant(owner: $owner) {
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
      roomId
      room {
        id
        name
        level
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
