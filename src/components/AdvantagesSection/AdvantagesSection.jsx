import css from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
  return (
    <div className={css.advantages_section}>
      <div className={css.advantages_info__block}>
        
        <div className={css.customers_block}>
          <ul className={css.customers_icons__list}>
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
          </ul>
          <p className={css.customers_info}>
            Our&nbsp;<span className={css.customers_info__span}>happy</span>
            customers
          </p>
        </div>

        <div className={css.benefits_info__wrap}>
          <div className={css.benefits_info__block}>
            <p className={`${css.benefits_btn} ${css.benefits_habits}`}>
              <span className={css.habits_roll} />
              Habit drive
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_statistics}`}>
              View statistics
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_personal__rate}`}>
              Personal rate setting
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdvantagesSection;
