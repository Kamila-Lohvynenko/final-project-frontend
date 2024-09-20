import css from './UserSettingsForm.module.css';
// import { useState, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectName,
  selectEmail,
  selectAvatarUrl,
  selectGender,
  selectWeight,
  selectTimeForSports,
  selectDailyIntake,
} from '../../redux/user/selectors.js';
import { useDispatch } from 'react-redux';
import { updateAvatar, updateUser } from '../../redux/user/operations.js';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sprite from '../../images/sprite.svg';
import defaultAvatar from '../../images/default_avatar.webp';
import { MODAL_NAME } from '../../constants/index.js';

const VALIDATION_SCHEMA = Yup.object().shape({
  avatar: Yup.mixed().test('fileType', 'Unsupported file format', (value) => {
    if (!value || !value[0])
      return true; /* If file is not selected, it will be considered as a valid file and won't show error */

    return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
      value[0].type,
    );
  }),
  gender: Yup.string().required('Please select gender'),
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  weight: Yup.number()
    .positive('Weight must be positive')
    .required('Weight is required'),
  sportTime: Yup.number()
    .min(0, 'Time cannot be negative')
    .required('Please specify time'),
  waterIntake: Yup.number()
    .positive('Water intake must be positive')
    .required('Please specify water intake'),
});

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const avatarUrl = useSelector(selectAvatarUrl);
  const gender = useSelector(selectGender);
  const weight = useSelector(selectWeight);
  const sportTime = useSelector(selectTimeForSports);
  const waterIntake = useSelector(selectDailyIntake);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(VALIDATION_SCHEMA),
    mode: 'onBlur',
    defaultValues: {
      name,
      email,
      gender,
      weight,
      sportTime,
      waterIntake,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(avatarUrl);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(
      updateUser({
        name: data.name,
        email: data.email,
        gender: data.gender,
        weight: data.weight,
        activeSportTime: data.sportTime,
        dailyNorma: data.waterIntake,
      }),
      onClose(MODAL_NAME.SETTINGS_MODAL),
    );
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      formData.append('avatar', file);
      dispatch(updateAvatar(formData));
      clearErrors('avatar');
      trigger('avatar');
    }
  };

  // const [calculatedWaterAmount, setCalculatedWaterAmount] = useState(null); // Состояние для хранения рассчитанной нормы воды

  // const [currentWeight, setCurrentWeight] = useState(weight); // Состояние для отслеживания веса
  // const [currentSportTime, setCurrentSportTime] = useState(sportTime); // Состояние для отслеживания времени активности

  // // Функция для расчета нормы воды
  // const calculateWaterNorm = (weight, time, gender) => {
  //   if (gender === 'woman') {
  //     return (weight * 0.03 + time * 0.4).toFixed(2);
  //   } else if (gender === 'man') {
  //     return (weight * 0.04 + time * 0.6).toFixed(2);
  //   }
  //   return null;
  // };

  // // Обновляем норму воды при изменении веса, времени или пола
  // useEffect(() => {
  //   const waterNorm = calculateWaterNorm(
  //     currentWeight,
  //     currentSportTime,
  //     gender,
  //   );
  //   setCalculatedWaterAmount(waterNorm);
  // }, [currentWeight, currentSportTime, gender]);

  return (
    <div className={css.scrollableContent}>
      <div className={css.uploadWrapper}>
        <img
          className={css.avatar}
          src={avatarPreview || defaultAvatar}
          alt="Avatar preview"
          width="75"
          height="75"
          loading="lazy"
        />
        <div className={css.inputWrapper}>
          <svg className={css.uploadPhotoIcon}>
            <use href={`${sprite}#icon-upload`}></use>
          </svg>
          <input
            className={css.hiddenInput}
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => {
              register('avatar').onChange(e);
              handleAvatarChange(e);
            }}
          />
          <label className={`${css.uploadLabel} ${css.text}`} htmlFor="avatar">
            Upload a photo
          </label>
          {errors.avatar && (
            <p className={css.errorMessage}>{errors.avatar.message}</p>
          )}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.content}>
            <div className={css.leftSide}>
              <div className={css.bigGap}>
                <p className={css.boldText}>Your gender identity</p>
                <div className={css.radioContainer}>
                  <input
                    type="radio"
                    id="woman"
                    value="woman"
                    {...register('gender')}
                  />
                  <label
                    htmlFor="woman"
                    className={`${css.genderLabel} ${css.text}`}
                  >
                    Woman
                  </label>
                  <input
                    type="radio"
                    id="man"
                    value="man"
                    {...register('gender')}
                  />
                  <label
                    htmlFor="man"
                    className={`${css.genderLabel} ${css.text}`}
                  >
                    Man
                  </label>
                  {errors.gender && (
                    <p className={css.errorMessage}>{errors.gender.message}</p>
                  )}
                </div>
              </div>
              <div className={`${css.userDataWrapper} ${css.bigGap}`}>
                <label
                  htmlFor="name"
                  className={`${css.boldText} ${css.inputLabel}`}
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  onBlur={() => trigger('name')}
                  className={`${css.inputs} ${css.smallGap}`}
                />
                {errors.name && (
                  <p className={css.errorMessage}>{errors.name.message}</p>
                )}
                <label
                  htmlFor="email"
                  className={`${css.boldText} ${css.inputLabel}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  onBlur={() => trigger('email')}
                  className={css.inputs}
                />
                {errors.email && (
                  <p className={css.errorMessage}>{errors.email.message}</p>
                )}
              </div>
              <div className={css.formulaContainer}>
                <p className={`${css.boldText} ${css.smallGap}`}>
                  My daily norma
                </p>
                <div className={`${css.formulaWrapper} ${css.smallGap}`}>
                  <div className={css.formulaBlock}>
                    <p className={`${css.text} ${css.miniGap}`}>For woman:</p>
                    <p className={`${css.text} ${css.formula}`}>
                      V=(M*0,03) + (T*0,4)
                    </p>
                  </div>
                  <div className={css.formulaBlock}>
                    <p className={`${css.text} ${css.miniGap}`}>For man:</p>
                    <p className={`${css.text} ${css.formula}`}>
                      V=(M*0,04) + (T*0,6)
                    </p>
                  </div>
                </div>
                <p className={`${css.spanText} ${css.text} ${css.smallGap}`}>
                  <span className={css.specialSign}>*</span> V is the volume of
                  the water norm in liters per day, M is your body weight, T is
                  the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
                </p>
                <span className={`${css.activeTimeWrapper} ${css.bigGap}`}>
                  <svg className={css.iconExclamationMark}>
                    <use href={`${sprite}#icon-exclamation-mark`}></use>
                  </svg>
                  <p className={css.text}>Active time in hours</p>
                </span>
              </div>
            </div>

            <div className={css.rightSide}>
              <div className={css.waterWrapper}>
                <label
                  htmlFor="weight"
                  className={`${css.inputLabel} ${css.text}`}
                >
                  Your weight in kilograms:
                </label>
                <input
                  type="number"
                  id="weight"
                  {...register('weight')}
                  onBlur={() => trigger('weight')}
                  // onChange={(e) => setCurrentWeight(e.target.value)} // Обновление веса
                  className={`${css.inputs} ${css.smallGap}`}
                />
                {errors.weight && (
                  <p className={css.errorMessage}>{errors.weight.message}</p>
                )}
                <label
                  htmlFor="sportTime"
                  className={`${css.inputLabel} ${css.text}`}
                >
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  id="sportTime"
                  {...register('sportTime')}
                  onBlur={() => trigger('sportTime')}
                  // onChange={(e) => setCurrentSportTime(e.target.value)} //Update time
                  className={`${css.inputs} ${css.bigGap}`}
                />
                {errors.sportTime && (
                  <p className={css.errorMessage}>{errors.sportTime.message}</p>
                )}
              </div>
              <div className={css.waterWrapper}>
                <div className={`${css.litersWrapper} ${css.smallGap}`}>
                  <p className={css.text}>
                    The required amount of water in liters per day:
                  </p>
                  <p className={`${css.spanWaterAmount} ${css.text}`}>
                    {/* {calculatedWaterAmount
                      ? `${calculatedWaterAmount} L`
                      : '2L'} */}
                  </p>
                </div>
                <label
                  htmlFor="waterIntake"
                  className={`${css.boldText} ${css.inputLabel}`}
                >
                  Write down how much water you will drink:
                </label>
                <input
                  type="number"
                  id="waterIntake"
                  {...register('waterIntake')}
                  onBlur={() => trigger('waterIntake')}
                  className={css.inputs}
                />
                {errors.waterIntake && (
                  <p className={css.errorMessage}>
                    {errors.waterIntake.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className={css.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsForm;
