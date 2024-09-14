// import { useParams } from "react-router-dom"
// import { parseDateTime } from "./helpme/parseDateTim.js";
// // import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import css from "./CalendarPagination.module.css"
// import { useDispatch } from "react-redux";
// import sprite from "../../images/sprite.svg"
// import {monthsName} from "../CalendarPagination/helpme/constants.js";
// import { Title } from "../CalendarItem/Title/Title.jsx";

// const CalendarPagination = () => {
//     const {date: dateUrl} = useParams();
//     const dateMs = parseDateTime(dateUrl);
//     const dispatch = useDispatch();
//     const [year, setYear] = useState(new Date(dateMs).getFullYear());
//     const [ month, setMonth] = useState(new Date(dateMs).getMonth());
// // const isLoading = useSelector();

//     const increment = () => {
//         if (month === 11) {
//             dispatch(
//                 // Отправляется действие в Redux для получения данных о воде за выбранный месяц - должна быть с редукса операция
//              (new Date(year + 1, 4).getTime()));
//              setMonth(0);
//              setYear(year +1);
//              return;
//         }
//         dispatch (
//               // Отправляется действие в Redux для получения данных о воде за выбранный месяц - должна быть с редукса операция
//               (new Date(year, month + 1, 4).getTime()));
//               setMonth(month + 1);
//     };

//     const decrement = () => {
//         if (month === 0 ) {
//             dispatch(
//                   // Отправляется действие в Redux для получения данных о воде за выбранный месяц - должна быть с редукса операция
//                   (new Date(year  - 1, 11, 4).getTime()));
//                   setMonth(11);
//                   setYear(year - 1);
//                   return;
//         }
//         dispatch(
//  // Отправляется действие в Redux для получения данных о воде за выбранный месяц - должна быть с редукса операция
//             (new Date(year, month - 1, 4).getTime()));
//             setMonth(month - 1);
//     };
//     const selectedMonth = (monthsName[month]);
//     const title = ("month");

//     const yearNow = new Date(Date.now()).getFullYear();
//     const monthNow = new Date(Date.now()).getMonth();
//     const incrementDisabled = new Date(yearNow, monthNow) <= new Date(year, month);

//     return (
//         <div className={`${css.calendar_title}`}>
//             <Title title = {title} styles={css.month}/>
//             <div className={css.month_ind}>
//                 <button onClick={decrement} className={css.btn} >
//                 <IoIosArrowBack className={css.svg_arrow_left} />
//                 </button>
//                 <span className={css.month_year}>
//           {`${selectedMonth},
// 					${year}`}
//         </span>
//                     <button onClick={increment} className={`${css.btn} ${incrementDisabled ? css.btn_disabled : ""}`}
//                     disabled = {  incrementDisabled}>
//                           <IoIosArrowForward className={css.svg_arrow_right} />
//                           </button>
//                           <svg className={css.svg_chart}>
//                             <use href={`${sprite}#icon-pie-chart-02`}/>
//                             </svg>

//                           </div>

//                 </div>

//     );
// };

// export default CalendarPagination;
// import { NavLink, useParams } from 'react-router-dom';
import { parseDateTime } from './helpme/parseDateTim.js';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import css from './CalendarPagination.module.css';
import sprite from '../../images/sprite.svg';
import { monthsName } from '../CalendarPagination/helpme/constants.js';
import { Title } from '../CalendarItem/Title/Title.jsx';
import { useParams } from 'react-router-dom';
// import clsx from 'clsx';

const CalendarPagination = ({ onDateChange, setIsCalender, isCalendar }) => {
  const { date: dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);
  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());

  const increment = () => {
    let newYear = year;
    let newMonth = month + 1;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setYear(newYear);
    setMonth(newMonth);
    onDateChange(newYear, newMonth);
  };

  const decrement = () => {
    let newYear = year;
    let newMonth = month - 1;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setYear(newYear);
    setMonth(newMonth);
    onDateChange(newYear, newMonth);
  };

  const selectedMonth = monthsName[month];
  const title = 'Month';

  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth();
  const incrementDisabled =
    new Date(yearNow, monthNow) <= new Date(year, month);
  const handleClick = (isCalender) => {
    setIsCalender(!isCalender);
  };

  return (
    <div className={`${css.calendar_title}`}>
      <Title title={title} styles={css.month} />
      <div className={css.month_ind}>
        <button onClick={decrement} className={css.btn}>
          <IoIosArrowBack className={css.svg_arrow_left} />
        </button>
        <span className={css.month_year}>{`${selectedMonth}, ${year}`}</span>
        <button
          onClick={increment}
          className={`${css.btn} ${incrementDisabled ? css.btn_disabled : ''}`}
          disabled={incrementDisabled}
        >
          <IoIosArrowForward className={css.svg_arrow_right} />
        </button>
        {/* <NavLink
          to="calendar"
          className={({ isActive }) => {
            return clsx(css.statistic_btn, {
              [css.isHidden]: isActive,
            });
          }}
        >
                <svg className={css.svg_chart}>
                    <use href={`${sprite}#icon-pie-chart-02`} />
                </svg>
                </NavLink> */}
        <button type="button" onClick={() => handleClick(isCalendar)}>
          <svg className={css.svg_chart}>
            <use href={`${sprite}#icon-pie-chart-02`} />
          </svg>
        </button>
        {/* <NavLink
          to="schedule"
          className={({ isActive }) => {
            return clsx(css.statistic_btn, {
              [css.isHidden]: isActive,
            });
          }}
        ></NavLink> */}
      </div>
    </div>
  );
};

export default CalendarPagination;
