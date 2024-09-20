import { useSelector } from 'react-redux';
import { selectWaterByMonth } from '../../redux/water/selectors.js';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { selectDailyIntake } from '../../redux/user/selectors.js';

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
const Calendar = ({ year, month, setChosenDate }) => {
  const dailyRecords = useSelector(selectWaterByMonth);
  const goal = useSelector(selectDailyIntake);
  if (!dailyRecords || !Array.isArray(dailyRecords)) {
    return <p>Error: Daily records data is not available.</p>;
  }
  const daysInMonth = getDaysInMonth(year, month);
  const dateArray = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${day}`;
    const recordsForDay = dailyRecords.filter(
      (record) =>
        record.day === day &&
        record.month === String(month + 1).padStart(2, '0') &&
        record.year === String(year),
    );
    const amount = recordsForDay.reduce(
      (total, record) => total + record.amount * 1000,
      0,
    );
    const percent = goal > 0 ? Math.round((amount / goal) * 100) : 0;
    return {
      date,
      amount,
      percent,
    };
  });

  return (
    <div className={css.container}>
      <ul className={css.calendarList}>
        {dateArray.map((eachDate, index) => (
          <li key={index}>
            <CalendarItem
              setChosenDate={setChosenDate}
              calendarDate={eachDate.date}
              amount={eachDate.amount}
              percentage={`${eachDate.percent}%`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
