import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { times } from 'lodash';
import moment from 'moment';
import React, {
  useEffect,
  useState
} from 'react';

import * as atoms from 'atoms';

import style from './index.module.scss';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const PX_PER_DAY = 10;

const TimelineView = () => {
  const plants = useAtomValue(atoms.activePlants);

  const [dateStart, setDateStart] = useState(Date.now());
  const [dateEnd] = useState(Date.now());

  const momentStart = moment(dateStart);
  const dayCount = moment(dateEnd).diff(dateStart, 'days');
  const weekCount = Math.ceil(dayCount / 7);

  useEffect(() => {
    setDateStart(plants.reduce((minDate, p) => (
      Math.min(moment(p.waterings[0]?.date).valueOf(), minDate)
    ), Date.now()));
  }, [plants]);

  const getX = (d) => (d - dateStart) * (1 / MS_PER_DAY) * (PX_PER_DAY);

  // const getW = (da, db) => getX(db) - getX(da);

  function renderPlant(plant) {
    const isWateringDate = (index) => {
      const formattedDate = momentStart
        .clone()
        .add(index + 1, 'days')
        .format('YYYY-MM-DD');

      return plant.waterings.some((w) => (
        w.date === formattedDate
      ));
    };

    return (
      <div
        className={style.plant}
        key={plant.id}>

        <h4>{plant.name}</h4>

        <div className={style.timeline}>

          {times(dayCount, (i) => (
            <div
              key={i}
              className={classNames({
                [style.pt]: true,
                [style.watering]: isWateringDate(i)
              })}
              style={{
                left: getX(
                  momentStart
                    .clone()
                    .add(i + 1, 'days')
                    .valueOf()
                )
              }} />
          ))}

        </div>

      </div>
    );
  }

  function renderCalendar() {
    return (
      <div className={style.wrapCalendar}>
        {times(dayCount, (i) => (
          <div
            key={i}
            className={classNames(
              style.line,
              style.day
            )}
            style={{
              left: getX(
                momentStart
                  .clone()
                  .add(i + 1, 'days')
                  .valueOf()
              )
            }} />
        ))}
        {times(weekCount, (i) => (
          <div
            key={i}
            className={classNames(
              style.line,
              style.week
            )}
            style={{
              left: getX(
                momentStart
                  .clone()
                  .add(i + 1, 'weeks')
                  .valueOf()
              )
            }} />
        ))}
      </div>
    );
  }

  return (
    <div className={style.wrap}>

      <h2>Timeline</h2>

      <div className={style.wrapTimeline}>
        {renderCalendar()}
        {plants.map(renderPlant)}
      </div>

    </div>
  );
};

export default TimelineView;