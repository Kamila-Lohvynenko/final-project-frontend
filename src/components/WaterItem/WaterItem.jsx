import css from './WaterItem.module.css';
import sprite from '../../images/sprite.svg';

const WaterItem = ({
  id,
  amount,
  time,
  openWaterModal,
  setDeleteWaterModal,
  setWater,
}) => {
  return (
    <div className={css.waterItem}>
      <div>
        <svg className={css.waterIcon}>
          <use href={sprite + '#icon-water-glass'} />
        </svg>
      </div>
      <div className={css.waterInfo}>
        <p className={css.volume}>{amount} ml</p>
        <p className={css.time}>{time} AM</p>
      </div>
      <div className={css.waterButtons}>
        <button
          type="button"
          className={css.waterButton}
          onClick={() => {
            setWater({ id, amount, time });
            openWaterModal();
          }}
        >
          <svg className={css.editBtn}>
            <use href={sprite + '#icon-edit-2'} />
          </svg>
        </button>
        <button
          type="button"
          className={css.waterButton}
          onClick={() => {
            setWater(id);
            setDeleteWaterModal();
          }}
        >
          <svg className={css.removeBtn}>
            <use href={sprite + '#icon-trash-04'} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
