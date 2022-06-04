import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { times } from 'lodash';

import { AppContext } from 'components/App';

import style from './index.module.scss';

const MS_PER_DAY = 1000 * 60 * 60  * 24,
      PX_PER_DAY = 10;

export default function TimelineView() {

  let {
    activePlants: plants
  } = useContext(AppContext);

  const [ dateStart, setDateStart ] = useState(Date.now());
  const [ dateEnd ] = useState(Date.now());

  useEffect(() => {
    setDateStart(plants.reduce((minDate, p) => (
      Math.min(moment(p.waterings[0]?.date).valueOf(), minDate)
    ), Date.now()));
  }, [ plants ]);

  const getX = (d) => {
    return (d - dateStart) * (1 / MS_PER_DAY) * (PX_PER_DAY);
  }

  const getW = (da, db) => {
    return getX(db) - getX(da);
  }

  function renderPlant(plant) {

    return (
      <div
        className={style.plant}
        key={plant.id}>

        <h4>{plant.name}</h4>

        <div className={style.timeline}>

          <div
            className={style.line}
            style={{
              width: getW(dateStart, dateEnd)
            }} />

          {plant.waterings.map((w, i) => (
            <div
              key={i}
              className={style.pt}
              style={{
                left: getX(moment(w.date).valueOf())
              }} />
          ))}

        </div>

      </div>
    );

  }

  function renderCalendar() {

    const momentStart = moment(dateStart),
          dayCount    = moment(dateEnd).diff(dateStart, 'days'),
          weekCount   = Math.ceil(dayCount / 7);

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
    )

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

}
