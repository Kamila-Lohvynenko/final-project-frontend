import css from '../AddWaterBtn/AddWaterBtn.module.css';
import sprite from '../../images/sprite.svg';

const AddWaterBtn =({onClick})=>{
    return(
        <button type="button" className={css.btnAdd} onClick={onClick}>
            <svg className={css.plus}>
                <use xlinkHref={sprite + "#icon-plus-wide"}/>
            </svg>

            <h2 className={css.btnText}>
            Add water
            </h2>            
        </button>
    );
};

export default AddWaterBtn;