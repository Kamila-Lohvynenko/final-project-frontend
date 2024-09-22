import { useTranslation } from 'react-i18next';
import css from './AdvantagesSection.module.css';

const AdvantagesSection = ({ userCount }) => {
  const { t } = useTranslation();
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

          {/* <p className={css.customers_info}>
            {t('our', { count: userCount })}&nbsp;
            <span className={css.customers_info__span}>
              {t('happy_customers', { count: userCount })}
            </span>
            &nbsp;
            {t('customers', { count: userCount })}
          </p> */}
        </div>

        <div className={css.benefits_info__wrap}>
          <div className={css.benefits_info__block}>
            <p className={`${css.benefits_btn} ${css.benefits_habits}`}>
              <span className={css.habits_roll} />
              {t('Habit drive')}
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_statistics}`}>
              {t('View statistics')}
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_personal__rate}`}>
              {t('View statistics')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
