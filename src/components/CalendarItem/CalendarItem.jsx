// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { parseDateTime } from "../CalendarPagination/helpme/parseDateTim.js";
// import css from "./CalendarItem.module.css"
// import { useNavigate } from "react-router-dom";



// const isFutureDate = (date) => {
//     const dateNow = new Date();
//     const currentDate = new Date(Number(date));
//     dateNow.setHours(23);
//     dateNow.setMinutes(59);
//     dateNow.setSeconds(59);
//     dateNow.setMilliseconds(999);
//     return dateNow.getTime() < currentDate.getTime();
// };


// const isDay = (firstDay, secondDay) => {
//     const first = new Date(Number(firstDay));
//     const second = new Date(Number(secondDay));

//     return (
//         first.getFullYear() === second.getFullYear() &&
//         first.getMonth() === second.getMonth() &&
//         first.getDate()=== second.getDate()
//     );
// };

// const CalendarItem = ({ calendarDate, amount }) => {
//     const navig = useNavigate();
//     const dispatch = useDispatch();
//     const goal = useSelector();
//     const {date: paramsData} = useParams();
//     const currentDate = parseDateTime(paramsData);

//     const handleClick = (calendarDate) => {
//         navig(`/tracker/${calendarDate}`);
//         dispatch(
//             // запрос
//             (calendarDate));
//     };

//     const date = new Date(Number(calendarDate)).getDate();

//     const percent = goal > 0 ? Math.round((amount/ (goal * 1000)) *100) : amount;
//     const isDisabled = isFutureDate(calendarDate);

//     const isDane = Math.round(percent) < 100;
//     const isActive = isDay(currentDate, calendarDate);
//     const percentString = Math.round(percent) >= 100 ? "100%" : `${percent}%`;
//     return(
//         <button className={(css.day, {[css.disabled]: isDisabled,})}
//         disabled = {isDisabled}
//         onClick={() => handleClick(calendarDate)}>
//             <div className={(css.date, {
//                 [css.perc_filled]: isDane,
//                 [css.active]: isActive,
//             })}>
//                 {date}
//                 </div>
//                 <div className={css.perc}>{percentString}</div>
//         </button>
//     );
// };

// export default CalendarItem

import { useParams } from "react-router-dom";
import { parseDateTime } from "../CalendarPagination/helpme/parseDateTim.js";
import css from "./CalendarItem.module.css";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const isFutureDate = (date) => {
    const dateNow = new Date();
    const currentDate = new Date(date);
    dateNow.setHours(23, 59, 59, 999);
    return dateNow.getTime() < currentDate.getTime();
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

const CalendarItem = ({ calendarDate }) => {
    const navigate = useNavigate();
    const { date: paramsData } = useParams();
    const currentDate = parseDateTime(paramsData);

    const handleClick = (calendarDate) => {
        if (!isFutureDate(calendarDate)) {
            navigate(`/tracker/${calendarDate}`);
        }
    };

    const date = new Date(calendarDate).getDate();
    const isDisabled = isFutureDate(calendarDate);
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
                    [css.disabledDate]: isDisabled,
                    [css.active]: isActive,
                })}
            >
                {date}
            </div>
            <div className={css.percentage}>
                0%
            </div>
        </button>
    );
};

export default CalendarItem;
