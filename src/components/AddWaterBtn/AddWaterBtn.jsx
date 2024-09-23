import sprite from '../../images/sprite.svg';
import css from '../AddWaterBtn/AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next'; 

const AddWaterBtn = ({ onClick, inDetails }) => {
    const { t } = useTranslation(); 

    return (!inDetails ? (
        <button type="button" className={css.btnAdd} onClick={onClick}>
            <svg className={css.plus}>
                <use xlinkHref={sprite + "#icon-plus-wide"} />
            </svg>
            <h2 className={css.btnText}>
                {t('addWaterBtn.addWater')}
            </h2>            
        </button>
    ) : (
        <button type="button" className={css.detailsBtnAdd} onClick={onClick}>
            <div className={css.detailsAddContainer}>
                <svg className={css.detailsAddSign}>
                    <use href={sprite + "#icon-plus-wide"} />
                </svg>
            </div>
            <h2 className={css.detailsBtnText}>
                {t('addWaterBtn.addWater')}
            </h2>            
        </button>
    ));
};

export default AddWaterBtn;
