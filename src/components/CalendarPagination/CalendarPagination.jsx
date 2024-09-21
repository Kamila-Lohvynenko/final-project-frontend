import { useParams } from "react-router-dom";
import { parseDateTime } from "./helpme/parseDateTim.js";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import css from "./CalendarPagination.module.css";
import { useDispatch } from "react-redux";
import sprite from "../../images/sprite.svg";
import { monthsName } from "../CalendarPagination/helpme/constants.js";
import { Title } from "../CalendarItem/Title/Title.jsx";
import { getWaterByMonth } from "../../redux/water/operations.js";

const CalendarPagination = ({ setIsCalender, isCalendar, onDateChange }) => {
    const { date: dateUrl } = useParams();
    const dateMs = parseDateTime(dateUrl);
    const dispatch = useDispatch();
    const [year, setYear] = useState(new Date(dateMs).getFullYear().toString());
    const [month, setMonth] = useState(new Date(dateMs).getMonth());

    const increment = () => {
        const newMonth = month === 11 ? 0 : month + 1;
        const newYear = month === 11 ? (parseInt(year) + 1).toString() : year;

        setMonth(newMonth);
        setYear(newYear);
        onDateChange(newYear, newMonth);
        const monthForApi = String(newMonth + 1).padStart(2, '0');
    dispatch(getWaterByMonth({ year: newYear, month: monthForApi }));
    };

    const decrement = () => {
        const newMonth = month === 0 ? 11 : month - 1;
        const newYear = month === 0 ? (parseInt(year) - 1).toString() : year;

        setMonth(newMonth);
        setYear(newYear);
        onDateChange(newYear, newMonth);
        const monthForApi = String(newMonth + 1).padStart(2, '0');
    dispatch(getWaterByMonth({ year: newYear, month: monthForApi }));
};

    const selectedMonth = monthsName[month];
    const title = "Month";

    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth();
    const incrementDisabled = new Date(yearNow, monthNow) <= new Date(parseInt(year), month);

    const handleClick = () => {
        setIsCalender(!isCalendar);
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
                <button type="button" onClick={handleClick}>
                    <svg className={css.svg_chart}>
                        <use href={`${sprite}#icon-pie-chart-02`} />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CalendarPagination;
