import { useTranslation } from 'react-i18next';
import css from './ChooseDate.module.css';

const ChooseDate = ({ chosenDate, classCss = 'day' }) => {
  const { t } = useTranslation(); // Получаем функцию перевода
  let date = t('today'); // Перевод для "Today"

  const today = new Date();

  const months = [
    t('month.january'),
    t('month.february'),
    t('month.march'),
    t('month.april'),
    t('month.may'),
    t('month.june'),
    t('month.july'),
    t('month.august'),
    t('month.september'),
    t('month.october'),
    t('month.november'),
    t('month.december'),
  ];
  
  const monthName = months[chosenDate.month - 1];

  if (
    today.getFullYear().toString() === chosenDate.year &&
    today.getMonth().toString() === (chosenDate.month - 1).toString() &&
    today.getDate().toString() === chosenDate.day
  ) {
    date = t('today'); // Перевод для "Today"
  } else {
    date = `${chosenDate.day}, ${monthName}`;
  }
  
  return <span className={css[classCss]}>{date}</span>;
};

export default ChooseDate;
