// import css from '../WaterDailyNorma/WaterDailyNorma.module.css';

// const WaterDailyNorma =()=>{
//     return(
//         <div className={css.containerDailyNorma}>
//             <p className={css.value}>2L</p>
//             <p className={css.text}>My daily norma</p>
//         </div>
//     );
// };

// export default WaterDailyNorma;

import { useSelector } from 'react-redux';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';
import {selectDailyIntake} from '../../redux/user/selectors.js';


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
