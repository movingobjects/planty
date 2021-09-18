
import { map } from 'lodash';
import moment from 'moment';

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
export function sortByBirthDate(plantA, plantB) {

  const dateA = plantA?.dateBorn ? moment(plantA?.dateBorn).valueOf() : 0,
        dateB = plantB?.dateBorn ? moment(plantB?.dateBorn).valueOf() : 0;

  return dateA - dateB;

}

export function calcDateNextWater(dates) {

  if (dates.length < 2) {
    return Date.now();
  }

  const first  = dates[0],
        latest = dates[dates.length - 1];

  return latest + (latest - first) / (dates.length - 1);

}

export function getDateLastWatered(plant) {

  return getLatestWatering(plant)?.date;

}
