// import CalendarItem from "../CalendarItem/CalendarItem.jsx";
// import css from "./Calendar.module.css"


// const Calendar = ({ dateArray }) => {
//     console.log("Received dateArray:", dateArray); 
//   return (
//     <div className={css.container}>
   
//       <ul className={css.calendarList}>
//         {dateArray.map((eachDate, index) => (
//           <li key={index}>
//             <CalendarItem
//               index={index}
//               calendarDate={eachDate.date}
//               amount={eachDate.amount}
//             //   goal={eachDate.goal} // если goal есть в каждом объекте eachDate
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Calendar;


import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

// Функция для вычисления количества дней в месяце
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate(); // Получает последний день месяца
};

const Calendar = ({ year, month }) => {
    // Определение количества дней в выбранном месяце
    const daysInMonth = getDaysInMonth(year, month);

    // Генерация массива с данными для каждого дня месяца
    const dateArray = Array.from({ length: daysInMonth }, (_, i) => ({
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
        amount: Math.floor(Math.random() * 1000), // Генерация случайного количества для примера
    }));

    return (
        <div className={css.container}>
            <p>Calendar UI Test for {month + 1}/{year}</p>
            <ul className={css.calendarList}>
                {dateArray.map((eachDate, index) => (
                    <li key={index}>
                        <CalendarItem
                            index={index}
                            calendarDate={eachDate.date}
                            amount={eachDate.amount}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;



  
  