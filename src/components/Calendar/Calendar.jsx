
import { useSelector } from "react-redux";
import { selectWaterByMonth } from "../../redux/water/selectors.js"; // Убедитесь, что этот путь правильный
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";
import { selectDailyIntake } from "../../redux/user/selectors.js";

// Функция для вычисления количества дней в месяце
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const Calendar = ({ year, month }) => {
    const dailyRecords = useSelector(selectWaterByMonth);
    const goal = useSelector(selectDailyIntake);
    

    console.log("Daily Records:", dailyRecords);

    if (!dailyRecords || !Array.isArray(dailyRecords)) {
        console.error("Daily records is undefined or not an array:", dailyRecords);
        return <p>Error: Daily records data is not available.</p>;
    }

    const daysInMonth = getDaysInMonth(year, month);
    console.log("Goal:", goal);

    const dateArray = Array.from({ length: daysInMonth }, (_, i) => {
        const day = String(i + 1).padStart(2, '0');
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${day}`;
    
        // Находим все записи для текущего дня
        const recordsForDay = dailyRecords.filter(record => 
            record.day === day && 
            record.month === String(month + 1).padStart(2, '0') && 
            record.year === String(year)
        );
    
        // Суммируем все значения для текущего дня
        const amount = recordsForDay.reduce((total, record) => total + record.amount * 1000, 0);
        
        const percent = goal > 0 ? Math.round((amount / goal) * 100) : 0;
    
        console.log("Date:", date, "Amount:", amount, "Percent:", percent);
    
        return {
            date,
            amount,
            percent
        };
    });
    
    console.log("Date Array:", dateArray);

    return (
        <div className={css.container}>
            <ul className={css.calendarList}>
                {dateArray.map((eachDate, index) => (
                    <li key={index}>
                        <CalendarItem
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
