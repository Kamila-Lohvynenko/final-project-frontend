import css from '../AddWaterBtn/AddWaterBtn.module.css';
import sprite from '../../images/sprite.svg';

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
        <button type="button" className={css.detailsBtnAdd}>
            <div className={css.detailsAddSign}>+</div> {/* replace with the actual icon */}
            <h2 className={css.detailsBtnText}>
            Add water
            </h2>            
        </button>
    );
};

export default AddWaterBtn;