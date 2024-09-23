import { useTranslation } from 'react-i18next';
import css from './AdvantagesSection.module.css';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios.config';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AdvantagesSection = () => {
  const [userCount, setUserCount] = useState(0);
  const { t } = useTranslation();
  const currentLang = localStorage.getItem('i18nextLng');

  const isEngLanguage = currentLang === 'en';

  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const response = await axiosInstance.get('users/count');

        const data = response.data.data;

        setUserCount(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    getUsersCount();
  }, []);

  return (
    <div className={css.advantages_section}>
      <div className={css.advantages_info__block}>
        <div
          className={`${css.customers_block} ${
            isEngLanguage ? css.customers_block_en : css.customers_block_ua
          }`}
        >
          <ul className={css.customers_icons__list}>
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
          </ul>
          {userCount === 0 ? (
            <p className={css.customers_info}>
              {t('Our')}&nbsp;
              <span className={css.customers_info__span}>{t('happy')}</span>
              {t('customers')}
            </p>
          ) : (
            <p className={css.customers_info}>
              {capitalizeFirstLetter(t('our', { count: userCount }))}&nbsp;
              <span className={css.customers_info__span}>
                {t('happy', { count: userCount })}
              </span>
              &nbsp;
              {t('customers', { count: userCount })}
            </p>
          )}
        </div>

        <div className={css.benefits_info__wrap}>
          <div
            className={`${css.benefits_info__block} ${
              isEngLanguage
                ? css.benefits_info__block_eng
                : css.benefits_info__block_ua
            }`}
          >
            <p className={`${css.benefits_btn} ${css.benefits_habits}`}>
              <span className={css.habits_roll} />
              {t('Habit drive')}
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_statistics}`}>
              {t('View statistics')}
            </p>
            <p className={`${css.benefits_btn} ${css.benefits_personal__rate}`}>
              {t('Personal rate setting')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
