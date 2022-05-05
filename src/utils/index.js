
import moment from 'moment';

export function getLatestWatering(plant) {
  return plant.waterings
    ?.slice()
    ?.sort((a, b) => a.date.localeCompare(b.date))
    ?.pop();
}

export function sortByDateLastWatered(plantA, plantB) {
  const dateA = getLatestWatering(plantA),
        dateB = getLatestWatering(plantB);
  return dateA.localeCompare(dateB);
}

export function sortByDateNextWater(plantA, plantB) {
  const dateA = plantA?.dateNextWater,
        dateB = plantB?.dateNextWater;
  return dateA.localeCompare(dateB);
}
export function sortByBirthDate(plantA, plantB) {
  const dateA = plantA?.dateBorn,
        dateB = plantB?.dateBorn;
  return dateA.localeCompare(dateB);
}

export function calcDateNextWater(dates, maxCount = 5) {

  if (dates.length < 2) {
    return moment().format('YYYY-MM-DD');
  }

  const count = Math.min(dates.length, maxCount);

  dates = dates.slice(-count);

  const first  = moment(dates[0]).valueOf(),
        latest = moment(dates[dates.length - 1]).valueOf(),
        next   = latest + (latest - first) / (dates.length - 1);

  return moment(next).format('YYYY-MM-DD');

}

export function getDateLastWatered(plant) {
  return getLatestWatering(plant)?.date;
}
