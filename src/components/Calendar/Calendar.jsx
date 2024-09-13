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


import CalendarItem from "../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";

const Calendar = ({ dateArray = [] }) => {
  console.log("Received dateArray:", dateArray);
  
  // Если dateArray пустой, добавляем пример данных для тестирования
  const testDateArray = dateArray.length > 0 ? dateArray : [
    { date: "2024-09-01", amount: 1000 },
    { date: "2024-09-02", amount: 500 },
    { date: "2024-09-03", amount: 250 },
    { date: "2024-09-01", amount: 1000 },
    { date: "2024-09-02", amount: 500 },
    { date: "2024-09-03", amount: 250 },
    { date: "2024-09-01", amount: 1000 },
    { date: "2024-09-02", amount: 500 },
    { date: "2024-09-03", amount: 250 },
    { date: "2024-09-01", amount: 1000 },
 
  ];

  return (
    <div className={css.container}>
      <p>Calendar UI Test</p>
      <ul className={css.calendarList}>
        {testDateArray.map((eachDate, index) => (
          <li key={index}>
            <CalendarItem
              index={index}
              calendarDate={eachDate.date}
              amount={eachDate.amount}
            //   goal={eachDate.goal} // если goal есть в каждом объекте eachDate
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;


  
  