import css from '../WaterForm/WaterForm.module.css';
import sprite from '../../images/sprite.svg';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWater, updateWater } from '../../redux/water/operations.js';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { OPERATION_NAME } from '../../constants/index.js';
import Loader from '../Loader/Loader.jsx';
import { useTranslation } from 'react-i18next';

const WaterForm = ({ onClose, water, chosenDate, operation, setWater }) => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    time: Yup.string()
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        t('waterForm.validation.time.format'), 
      )
      .required(t('waterForm.validation.time.required')), 
    amount: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(50, t('waterForm.validation.amount.min')) 
      .max(10000, t('waterForm.validation.amount.max')) 
      .required(t('waterForm.validation.amount.required')), 
  });
  const [waterValue, setWaterValue] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  useEffect(() => {
    if (operation === OPERATION_NAME.EDIT_WATER && water) {
      setWaterValue(water.amount);
      setValue('time', water.time);
      setValue('amount', water.amount);
    } else {
      setWaterValue(50);
      setValue('time', getCurrentTime());
      setValue('amount', 50);
    }
  }, [water, setValue, operation]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setIsDisable(true);
    const { year, month, day } = chosenDate;
    const portionData = {
      amount: waterValue,
      day: String(day).padStart(2, '0'),
      month: String(month).padStart(2, '0'),
      year: String(year),
      time: formData.time,
    };

    try {
      if (operation === OPERATION_NAME.EDIT_WATER && water) {
        await dispatch(updateWater({ id: water.id, portionData })).unwrap();
        setWater(null);
        toast.success(t('waterForm.successUpdate'), { duration: 1000 }); 
        setTimeout(() => {
          onClose();
          setIsDisable(false);
        }, 1000);
      } else {
        await dispatch(addWater(portionData)).unwrap();
        toast.success(t('waterForm.successAdd'), { duration: 1000 }); 
        setTimeout(() => {
          onClose();
          setIsDisable(false);
        }, 1000);
      }
    } catch {
      toast.error(t('waterForm.error')); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountOfWater}>{t('waterForm.amountOfWater')}</p>{' '}
    
      <div className={css.addWaterWrapper}>
        <button
          type="button"
          className={css.addWaterBtn}
          onClick={() => {
            setWaterValue((prev) => {
              const newValue = Math.max(prev - 50, 50);
              setValue('amount', newValue);
              trigger('amount');
              return newValue;
            });
          }}
        >
          <svg>
            <use xlinkHref={sprite + '#icon-remove'}></use>
          </svg>
        </button>

        <p className={css.addWaterValue}>
          {waterValue === '' || waterValue === null
            ? t('waterForm.amountValue', { value: 0 })
            : t('waterForm.amountValue', { value: waterValue })}
        </p>

        <button
          type="button"
          className={css.addWaterBtn}
          onClick={() => {
            setWaterValue((prev) => {
              const newValue = prev + 50;
              setValue('amount', newValue);
              trigger('amount');
              return newValue;
            });
          }}
        >
          <svg>
            <use xlinkHref={sprite + '#icon-add'}></use>
          </svg>
        </button>
      </div>
      <label className={css.recordingTimeLabel}>
        {t('waterForm.recordingTime')} 
        <input
  type="text"
  className={css.recordingTime}
  placeholder={t('placeholder_time')}
  {...register('time')}
/>
        {errors.time && <p className={css.error}>{errors.time.message}</p>}
      </label>
      <label className={css.waterValueLabel}>
        {t('waterForm.enterWaterValue')}
        <input
          type="number"
          className={css.waterValue}
          value={waterValue === null || waterValue === 0 ? '' : waterValue}
          {...register('amount')}
          onChange={(e) => {
            const newValue = e.target.value;
            const numericValue = newValue === '' ? null : Number(newValue);

            if (newValue === '' || numericValue >= 0) {
              setWaterValue(newValue === '' ? null : numericValue);
              setValue('amount', newValue === '' ? null : numericValue);
              trigger('amount');
            }
          }}
        />
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      </label>
      <div className={css.loaderWrapper}>{isSubmitting && <Loader />}</div>
      <button type="submit" className={css.saveBtn} disabled={isDisable}>
        {t('waterForm.saveButton')}
      </button>
    </form>
  );
};

export default WaterForm;
