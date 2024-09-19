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
    const dateArray = Array.from({ length: daysInMonth }, (_, i) => {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    
        let amount;
    
        // Устанавливаем значения в зависимости от дня
        if (i < 1) {
            amount = 0.3; // 30% для первых 4 дней
        } else if (i < 20) {
            amount = 1; // 100% для дней с 5 по 14
        } else {
            amount = Math.floor(Math.random() * 1000); // Остальные дни случайные значения
        }
    
        return {
            date,
            amount,
        };
    });
    
    return (
        <div className={css.container}>
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




  
  