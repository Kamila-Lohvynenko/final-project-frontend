import { useSelector } from 'react-redux';
import { selectDailyIntake } from '../../redux/user/selectors.js';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next'; 

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyIntake);
  const { t } = useTranslation(); 

  return (
    <div className={css.containerDailyNorma}>
  <p className={css.value}>{`${dailyNorma} ${t('waterDailyNorma.unit')}`}</p>
      <p className={css.text}>{t('waterDailyNorma.text')}</p> 
    </div>
  );
};

export default WaterDailyNorma;
