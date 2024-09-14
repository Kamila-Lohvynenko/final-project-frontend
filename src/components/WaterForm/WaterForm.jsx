import css from '../WaterForm/WaterForm.module.css';
import sprite from '../../images/sprite.svg';

const WaterForm =({operationType = "add", handleClose})=>{
    return(
        <form className={css.waterForm}>
            {/* Заголовок формы */}
            <p className={css.formHeader}>
                {operationType === "add" ? "Choose a value:" : "Correct entered data:"}
            </p>
            {/* Количество воды */}
            <p className={css.amountOfWater}>
            Amound of water:
            </p>
            <div className={css.addWaterWrapper}>
                <button type="button" className={css.addWaterBtn}>
                    <svg>
                    <use xlinkHref={sprite + "#icon-remove"}></use>
                    </svg>
                </button>
                <p className={css.addWaterValue}>0 ml</p>
                <button type="button" className={css.addWaterBtn}>
                    <svg>
                    <use xlinkHref={sprite + "#icon-add"}></use>
                    </svg>                    
                </button>                
            </div>
            {/* Ввод времени записи */}
            <label className={css.recordingTimeLabel}>
            Recording time:
            <input type="text" className={css.recordingTime} placeholder="HH:MM" />            
            </label>
            {/* Ввод количества воды */}
            <label className={css.waterValueLabel}>
            Enter the value of the water used:
            <input type="number" className={css.waterValue}></input>
            </label>
            <button type="submit" className={css.saveBtn}>
                Save
            </button>
        </form>
    );
};


export default WaterForm;