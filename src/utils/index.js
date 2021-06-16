
import { map } from 'lodash';

export function getWateringHistoryArray(plant) {
  return map(plant.wateringHistory || [], (w, id) => ({ ...w, id })) || [];
}

export function getLatestWatering(plant) {

  const history = getWateringHistoryArray(plant);

  if (!history?.length) return null;

  return history
    .slice()
    .sort((a, b) => a?.date - b?.date)
    .pop();

}

export function sortByDateLastWatered(plantA, plantB) {

  const dateA = getLatestWatering(plantA)?.date || 0,
        dateB = getLatestWatering(plantB)?.date || 0;

  return dateA - dateB;

}

export function sortByDateNextWater(plantA, plantB) {

  const dateA = plantA?.dateNextWater || 0,
        dateB = plantB?.dateNextWater || 0;

  return dateA - dateB;

}

export function calcDateNextWater(plant) {

  const history = getWateringHistoryArray(plant);

  if (!history?.length || history.length < 2) {
    return Date.now();
  }

  const datesCount = history.length,
        dateFirst  = history[0]?.date || 0,
        dateLatest = history[datesCount - 1]?.date || 0;

  return dateLatest + (dateLatest - dateFirst) / (datesCount - 1);

}

export function getDateLastWatered(plant) {

  return getLatestWatering(plant)?.date;

}
