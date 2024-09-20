import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { parseDateTime } from '../CalendarPagination/helpme/parseDateTim.js';
import css from './CalendarItem.module.css';
// import { useNavigate } from 'react-router-dom';
import { getWaterByDay } from '../../redux/water/operations.js';
import { selectDailyIntake } from '../../redux/user/selectors.js';
import clsx from 'clsx';

const isFutureDate = (date) => {
  const dateNow = new Date();
  const currentDate = new Date(date);
  dateNow.setHours(23, 59, 59, 999);
  return dateNow < currentDate;
};

const isDay = (firstDay, secondDay) => {
  const first = new Date(firstDay);
  const second = new Date(secondDay);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const CalendarItem = ({ calendarDate, amount, setChosenDate }) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const goal = useSelector(selectDailyIntake);
  const { date: paramsData } = useParams();
  const currentDate = parseDateTime(paramsData);

  const handleClick = (calendarDate) => {
    if (!isFutureDate(calendarDate)) {
      const arrayDate = calendarDate.split('-');
      const [year, month, day] = arrayDate;
      dispatch(getWaterByDay({ year, month, day }));
      setChosenDate({ year, month, day });
    }
  };

  const date = new Date(calendarDate).getDate();
  const isDisabled = isFutureDate(calendarDate);

  const percent = goal > 0 ? Math.round((amount / (goal * 1000)) * 100) : 0;
  const percentString = percent >= 100 ? '100%' : `${percent}%`;
  const isActive = isDay(currentDate, calendarDate);

  return (
    <button
      className={clsx(css.day, {
        [css.disabled]: isDisabled,
      })}
      disabled={isDisabled}
      onClick={() => handleClick(calendarDate)}
    >
      <div
        className={clsx(css.date, {
          [css.perc_filled]: percent < 100 && !isDisabled,
          [css.active]: isActive,
        })}
      >
        {date}
      </div>
      <div className={css.percentage}>{percentString}</div>
    </button>
  );
};

export default CalendarItem;
