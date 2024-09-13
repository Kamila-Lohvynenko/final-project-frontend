import css from '../AddWaterBtn/AddWaterBtn.module.css';

const AddWaterBtn = ({inDetails}) => {
    return( !inDetails ?
        <button type="button" className={css.btnAdd}>
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


