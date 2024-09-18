import sprite from '../../images/sprite.svg';
import css from '../AddWaterBtn/AddWaterBtn.module.css';

const AddWaterBtn =({onClick, inDetails})=>{
    return( !inDetails ?
        <button type="button" className={css.btnAdd} onClick={onClick}>
            <svg className={css.plus}>
                <use xlinkHref={sprite + "#icon-plus-wide"}/>
            </svg>
            <h2 className={css.btnText}>
            Add water
            </h2>            
        </button>
        : 
        <button type="button" className={css.detailsBtnAdd} onClick={onClick}>
            <div className={css.detailsAddContainer}>
                <svg className={css.detailsAddSign}>
                    <use href={sprite + "#icon-plus-wide"}/>
                </svg>
            </div>
            <h2 className={css.detailsBtnText}>
            Add water
            </h2>            
        </button>
    );
};

export default AddWaterBtn;