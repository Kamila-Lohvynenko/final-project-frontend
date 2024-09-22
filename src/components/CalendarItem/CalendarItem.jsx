import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import css from './CalendarItem.module.css';
import { getWaterByDay } from '../../redux/water/operations.js';
import { selectDailyIntake } from '../../redux/user/selectors.js';
import clsx from 'clsx';

const isFutureDate = (date) => {
  const dateNow = new Date();
  const currentDate = new Date(date);
  dateNow.setHours(23, 59, 59, 999);
  return dateNow < currentDate;
};

const CalendarItem = ({ calendarDate, amount, setChosenDate, isActive, setActiveDate }) => {
  const dispatch = useDispatch();
  const goal = useSelector(selectDailyIntake);

  const handleClick = () => {
    if (!isFutureDate(calendarDate)) {
      const [year, month, day] = calendarDate.split('-');
      
      dispatch(getWaterByDay({ year, month, day }))
        .catch

      setChosenDate({ year, month, day });
      setActiveDate(calendarDate);

    }
  };

  const date = new Date(calendarDate).getDate();
  const isDisabled = isFutureDate(calendarDate);
  
  const percent = useMemo(() => {
    return goal > 0 ? Math.round((amount / (goal * 1000)) * 100) : 0;
  }, [amount, goal]);

  const percentString = percent >= 100 ? '100%' : `${percent}%`;

  return (
    <button
      className={clsx(css.day, { [css.disabled]: isDisabled })}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <div
       className={clsx(css.date, {
        [css.perc_filled]: percent < 100 && !isDisabled,
        [css.active]: isActive,
        [css.red]: percent === 0 && !isActive,
      })}
    >
        {date}
      </div>
      <div className={css.percentage}>{percentString}</div>
    </button>
  );
};

export default CalendarItem;
