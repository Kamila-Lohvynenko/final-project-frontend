import css from "./ChooseDate.module.css";

const ChooseDate = ({ chosenDate }) => {
  let date = "Today";

  const today = new Date();


  const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  const monthName = months[chosenDate.month - 1];
  
  if (today.getFullYear().toString() === chosenDate.year 
    && today.getMonth().toString() === (chosenDate.month-1).toString()
    && today.getDate().toString() === chosenDate.day) {
      date = "Today";
  } else {
      date = chosenDate.day + ", " + monthName;
  }
  return (
      <span className={css.day}>{date}</span>
  );
};

export default ChooseDate;