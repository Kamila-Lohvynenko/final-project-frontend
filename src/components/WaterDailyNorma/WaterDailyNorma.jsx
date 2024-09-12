import css from '../WaterDailyNorma/WaterDailyNorma.module.css';

const WaterDailyNorma =()=>{
    return(
        <div className={css.containerDailyNorma}>
            <p className={css.value}>2L</p>
            <p className={css.text}>My daily norma</p>
        </div>
    )
};

export default WaterDailyNorma;