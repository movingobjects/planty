import moment from 'moment';

export const getImagePath = (kind, file, userId) => {
  const timestamp = Date.now();
  const ext = file?.name?.split('.').pop();
  return `${kind}/${userId}/${timestamp}.${ext}`;
};

export const sortByDateNextWater = (plantA, plantB) => {
  const dateA = plantA?.dateNextWater || moment().format('YYYY-MM-DD');
  const dateB = plantB?.dateNextWater || moment().format('YYYY-MM-DD');
  return dateA.localeCompare(dateB);
};

export const calcDateNextWater = (waterings, maxCount = 5) => {
  if (waterings.length < 2) {
    return moment().format('YYYY-MM-DD');
  }

  waterings = waterings.slice(-Math.min(waterings.length, maxCount));

  const dateA = moment(waterings.shift()?.date);
  const dateB = moment(waterings.pop()?.date);
  const diff = dateB.diff(dateA, 'days');
  const avgDays = diff / (waterings?.length + 1);

  return moment(dateB)
    .add(avgDays, 'days')
    .format('YYYY-MM-DD');
};

export const getDateLastWatered = (plant) => (
  plant.waterings
    ?.slice()
    ?.sort((a, b) => a.date.localeCompare(b.date))
    ?.pop()
    ?.date
);

export const getDaysSinceLastWatering = (plant) => {
  const dateLastWatered = getDateLastWatered(plant);
  return dateLastWatered
    ? moment()
      .startOf('day')
      .diff(dateLastWatered, 'days')
    : null;
};