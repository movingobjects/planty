
export const species = (state = [], action) => {
  switch (action.type) {
    case 'setSpecies':
      return action.species;
    default:
      return state;
  }
}

export const plants = (state = [], action) => {
  switch (action.type) {
    case 'setPlants':
      return action.plants;
    default:
      return state;
  }
}
