import css from '../AddWaterBtn/AddWaterBtn.module.css';

const AddWaterBtn =({onClick})=>{
    return(
        <button type="button" className={css.btnAdd} onClick={onClick}>
            <h2 className={css.btnText}>
            Add water
            </h2>            
        </button>
    );
};

export default AddWaterBtn;
