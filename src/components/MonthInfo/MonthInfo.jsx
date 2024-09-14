import { useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import css from "./MonthInfo.module.css";
// import WaterIntakeChart from "../Calendar/Water chart/WaterChart.jsx";


const MonthInfo = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    

    const handleDateChange = (year, month) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    };
 
    

    // const waterData = [
    //     { date: 1694534400000, amount: 1500 },  // 12 сентября 2023, 1500 мл
    //     { date: 1694620800000, amount: 2000 },  // 13 сентября 2023, 2000 мл
    //     { date: 1694707200000, amount: 1800 },  // 14 сентября 2023, 1800 мл
    //     { date: 1694793600000, amount: 1600 },  // 15 сентября 2023, 1600 мл
    //     { date: 1694880000000, amount: 1750 },  // 16 сентября 2023, 1750 мл
    //     { date: 1694966400000, amount: 1900 },  // 17 сентября 2023, 1900 мл
    //     { date: 1695052800000, amount: 2200 },  // 18 сентября 2023, 2200 мл
    // ];
    return (

        <div className={css.fon}>
            <CalendarPagination onDateChange={handleDateChange} />
            <Calendar year={selectedYear} month={selectedMonth} />
            <div>
            {/* Передаем данные как пропсы */}
            {/* <WaterIntakeChart waterData={waterData} /> */}
            
            
        </div>
  

        </div>
    );
};

export default MonthInfo;
