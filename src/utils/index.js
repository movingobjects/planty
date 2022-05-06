
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
  const dateA = plantA?.dateNextWater || moment().format('YYYY-MM-DD'),
        dateB = plantB?.dateNextWater || moment().format('YYYY-MM-DD');
  return dateA.localeCompare(dateB);
}
export function sortByBirthDate(plantA, plantB) {
  const dateA = plantA?.dateBorn,
        dateB = plantB?.dateBorn;
  return dateA.localeCompare(dateB);
}

export function calcDateNextWater(waterings, maxCount = 5) {

  if (waterings.length < 2) {
    return moment().format('YYYY-MM-DD');
  }

  waterings = waterings.slice(-Math.min(waterings.length, maxCount));

  const dateA   = moment(waterings.shift()?.date),
        dateB   = moment(waterings.pop()?.date),
        diff    = dateB.diff(dateA, 'days'),
        avgDays = diff / (waterings?.length - 1);

  return moment(dateB)
    .add(avgDays, 'days')
    .format('YYYY-MM-DD');

}

export function getDateLastWatered(plant) {
  return getLatestWatering(plant)?.date;
}

export function getTimeFromLastWater(plant) {

  const diff = moment()
    .startOf('day')
    .diff(getDateLastWatered(plant), 'days');

  if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Yesterday';
  } else {
    return `${diff} days ago`;
  }

}
