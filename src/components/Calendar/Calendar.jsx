import { useSelector } from 'react-redux';
import { selectWaterByMonth } from '../../redux/water/selectors.js';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { selectDailyIntake } from '../../redux/user/selectors.js';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';


const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const calculateDateInfo = (year, month, dailyRecords, goal) => {
  const daysInMonth = getDaysInMonth(year, month);
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${day}`;
    const recordsForDay = dailyRecords.filter(
      (record) =>
        record.day === day &&
        record.month === String(month + 1).padStart(2, '0') &&
        record.year === String(year),
    );

    const amount = recordsForDay.reduce((total, record) => total + record.amount * 1000, 0);
    const percent = goal > 0 ? Math.round((amount / goal) * 100) : 0;

    return { date, amount, percent };
  });
};

const Calendar = ({ year, month, setChosenDate }) => {
  const dailyRecords = useSelector(selectWaterByMonth);
  const goal = useSelector(selectDailyIntake);
  const [activeDate, setActiveDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setActiveDate(formattedDate);
  }, []);

  useEffect(() => {
    if (dailyRecords) {
      setIsLoading(false);
    }
  }, [dailyRecords]);

  if (isLoading) {
    return <Loader />;
  }

  if (!dailyRecords) {
    return <p>Error: Daily records data is not available.</p>;
  }

  const dateArray = calculateDateInfo(year, month, dailyRecords, goal);

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
              isActive={activeDate === eachDate.date}
              setActiveDate={setActiveDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
