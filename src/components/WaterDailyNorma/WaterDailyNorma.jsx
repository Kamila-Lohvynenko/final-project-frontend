import { useSelector } from 'react-redux';
import {selectDailyIntake} from '../../redux/user/selectors.js';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';

const WaterDailyNorma =()=>{
    const dailyNorma = useSelector(selectDailyIntake);

    return(
        <div className={css.containerDailyNorma}>
            <p className={css.value}>{`${dailyNorma}L`}</p>
            <p className={css.text}>My daily norma</p>
        </div>
    );
};

export default WaterDailyNorma;


