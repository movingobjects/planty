
import { map } from 'lodash';
import moment from 'moment';

export function getLatestWatering(plant) {

  if (!plant.wateringHistory) return null;

  const history = map(plant.wateringHistory, (w, id) => ({ ...w, id })) || []

  return history
    .slice()
    .sort((a, b) => a?.date - b?.date)
    .pop();

}

export function sortByLatestWateringDate(plantA, plantB) {

  const dateA = getLatestWatering(plantA)?.date || 0,
        dateB = getLatestWatering(plantB)?.date || 0;

  return dateA - dateB;

}

export function getWateredLastText(plant) {

  const lastWatering = getLatestWatering(plant);

  if (!lastWatering?.date) return null;

  return moment(lastWatering.date).fromNow();

}
