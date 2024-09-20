import { useState } from 'react';
import Calendar from '../Calendar/Calendar.jsx';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import css from './MonthInfo.module.css';
import WaterIntakeChart from '../Calendar/WaterChart/WaterChart.jsx';

const MonthInfo = ({ setChosenDate }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isCalendar, setIsCalender] = useState(true);

  const handleDateChange = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (
    <div className={css.fon}>
      <CalendarPagination
        onDateChange={handleDateChange}
        setIsCalender={setIsCalender}
        isCalendar={isCalendar}
      />
      {isCalendar ? (
        <Calendar
          year={selectedYear}
          month={selectedMonth}
          setChosenDate={setChosenDate}
        />
      ) : (
        <WaterIntakeChart />
      )}
      <div>{/* Передаем данные как пропсы */}</div>
    </div>
  );
};

export default MonthInfo;
