import css from "./ChooseDate.module.css";

const ChooseDate = () => {
    const day = "Today";        // replace with dinamic date
  return (
      <span className={css.day}>{day}</span>
  );
};

export default ChooseDate;