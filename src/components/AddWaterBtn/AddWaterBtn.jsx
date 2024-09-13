import css from '../AddWaterBtn/AddWaterBtn.module.css';

const AddWaterBtn =()=>{
    return(
        <button type="button" className={css.btnAdd}>
            <h2 className={css.btnText}>
            Add water
            </h2>            
        </button>
    );
};

export default AddWaterBtn;


