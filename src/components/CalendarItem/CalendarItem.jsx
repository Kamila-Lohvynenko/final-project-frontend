import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { parseDateTime } from "../CalendarPagination/helpme/parseDateTim.js";
import css from "./CalendarItem.module.css";
import { useNavigate } from "react-router-dom";
import { getWaterByDay } from "../../redux/water/operations.js";
import { selectDailyIntake } from "../../redux/user/selectors.js";
import clsx from "clsx";


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

const CalendarItem = ({ calendarDate, amount }) => {
    // console.log("Amount from Redux:", amount);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goal = useSelector(selectDailyIntake); // Получаем цель
    const { date: paramsData } = useParams();
    const currentDate = parseDateTime(paramsData);
    // console.log("Amount:", amount, "Goal:", goal);

    const handleClick = (calendarDate) => {
        if (!isFutureDate(calendarDate)) {
            navigate(`/tracker/${calendarDate}`);
            dispatch(getWaterByDay(calendarDate));
        }
    };

    const date = new Date(calendarDate).getDate();
    const isDisabled = isFutureDate(calendarDate);
    
    // Рассчитываем процент прямо здесь
    const percent = goal > 0 ? Math.round((amount / (goal * 1000)) * 100) : 0;
    const percentString = percent >= 100 ? "100%" : `${percent}%`;
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
            <div className={css.percentage}>{percentString}</div> {/* Используем рассчитанный процент */}
        </button>
    );
};

export default CalendarItem;





// import { useParams } from "react-router-dom";
// import { parseDateTime } from "../CalendarPagination/helpme/parseDateTim.js";
// import css from "./CalendarItem.module.css";
// import { useNavigate } from "react-router-dom";
// import clsx from "clsx";

// const isFutureDate = (date) => {
//     const dateNow = new Date();
//     const currentDate = new Date(date);
//     dateNow.setHours(23, 59, 59, 999);
//     return dateNow.getTime() < currentDate.getTime();
// };

// const isDay = (firstDay, secondDay) => {
//     const first = new Date(firstDay);
//     const second = new Date(secondDay);

//     return (
//         first.getFullYear() === second.getFullYear() &&
//         first.getMonth() === second.getMonth() &&
//         first.getDate() === second.getDate()
//     );
// };

// const CalendarItem = ({ calendarDate }) => {
//     const navigate = useNavigate();
//     const { date: paramsData } = useParams();
//     const currentDate = parseDateTime(paramsData);

//     const handleClick = (calendarDate) => {
//         if (!isFutureDate(calendarDate)) {
//             navigate(`/tracker/${calendarDate}`);
//         }
//     };

//     const date = new Date(calendarDate).getDate();
//     const isDisabled = isFutureDate(calendarDate);
//     const isActive = isDay(currentDate, calendarDate);

//     return (
//         <button
//             className={clsx(css.day, {
//                 [css.disabled]: isDisabled,
//             })}
//             disabled={isDisabled}
//             onClick={() => handleClick(calendarDate)}
//         >
//             <div
//                 className={clsx(css.date, {
//                     [css.disabledDate]: isDisabled,
//                     [css.active]: isActive,
//                 })}
//             >
//                 {date}
//             </div>
//             <div className={css.percentage}>
//                 0%
//             </div>
//         </button>
//     );
// };

// export default CalendarItem;
