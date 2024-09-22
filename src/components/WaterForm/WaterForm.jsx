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

// Валидация
const validationSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Time must be in the format HH:MM',
    )
    .required('Recording time is required'),
  amount: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value)) // Преобразование для NaN
    .min(50, 'Amount must be at least 50 ml')
    .max(10000, 'Amount cannot exceed 10 liters (10000 ml)')
    .required('Enter a value from 50 ml to 10000 ml'),
});

const WaterForm = ({ onClose, water, chosenDate, operation, setWater }) => {
  const [waterValue, setWaterValue] = useState(50);
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

  // Функция для получения текущего времени в формате HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Монтаж установка времени
  useEffect(() => {
    if (operation === OPERATION_NAME.EDIT_WATER) {
      setWaterValue(water.amount);
      setValue('time', water.time);
      setValue('amount', water.amount);
    } else {
      setWaterValue(50);
      setValue('time', getCurrentTime());
      setValue('amount', 50);
    }
  }, [water, setValue, operation]);

  // Отправка
  const onSubmit = async (formData) => {
    const { year, month, day } = chosenDate;
    const portionData = {
      amount: waterValue,
      day: String(day).padStart(2, '0'),
      month: String(month).padStart(2, '0'),
      year: String(year),
      time: formData.time,
    };

    try {
      if (operation === OPERATION_NAME.EDIT_WATER) {
        await dispatch(updateWater({ id: water.id, portionData })).unwrap();
        setWater(null);
        toast.success('Water portion updated successfully!');
      } else {
        await dispatch(addWater(portionData)).unwrap();
        toast.success('Water portion added successfully!');
      }
      onClose();
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountOfWater}>Amount of water:</p>
      <div className={css.addWaterWrapper}>
        <button
          type="button"
          className={css.addWaterBtn}
          onClick={() => setWaterValue((prev) => Math.max(prev - 50, 50))}
        >
          <svg>
            <use xlinkHref={sprite + '#icon-remove'}></use>
          </svg>
        </button>
        <p className={css.addWaterValue}>
          {waterValue === '' || waterValue === null
            ? '0 ml'
            : `${waterValue} ml`}
        </p>
        <button
          type="button"
          className={css.addWaterBtn}
          onClick={() => setWaterValue((prev) => prev + 50)}
        >
          <svg>
            <use xlinkHref={sprite + '#icon-add'}></use>
          </svg>
        </button>
      </div>
      {/* Ввод времени записи */}
      <label className={css.recordingTimeLabel}>
        Recording time:
        <input
          type="text"
          className={css.recordingTime}
          placeholder="HH:MM"
          {...register('time')}
        />
        {errors.time && <p className={css.error}>{errors.time.message}</p>}
      </label>
      {/* Ввод количества воды */}
      <label className={css.waterValueLabel}>
        Enter the value of the water used:
        <input
          type="number"
          className={css.waterValue}
          value={waterValue === null || waterValue === 0 ? '' : waterValue}
          {...register('amount')}
          onChange={(e) => {
            const newValue = e.target.value;
            const numericValue = newValue === '' ? null : Number(newValue);

            // Разрешаем пустую строку или значение больше нуля
            if (newValue === '' || numericValue >= 0) {
              setWaterValue(newValue === '' ? null : numericValue);
              setValue('amount', newValue === '' ? null : numericValue);
              trigger('amount'); // Триггерим валидацию на ввод
            }
          }}
        />
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      </label>
      <button type="submit" className={css.saveBtn}>
        Save
      </button>
    </form>
  );
};

export default WaterForm;
