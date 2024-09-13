import { useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";

const MonthInfo = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const handleDateChange = (year, month) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    };

    return (
        <div>
            <CalendarPagination onDateChange={handleDateChange} />
            <Calendar year={selectedYear} month={selectedMonth} />
        </div>
    );
};

export default MonthInfo;
