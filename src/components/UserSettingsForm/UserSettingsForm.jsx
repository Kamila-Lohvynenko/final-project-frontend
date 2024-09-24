import css from './UserSettingsForm.module.css';
import { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const avatarUrl = useSelector(selectAvatarUrl);
  const gender = useSelector(selectGender);
  const weight = useSelector(selectWeight);
  const sportTime = useSelector(selectTimeForSports);
  const waterIntake = useSelector(selectDailyIntake);
  const VALIDATION_SCHEMA = Yup.object().shape({
    avatar: Yup.mixed().test(
      'fileType',
      t('unsupported_file_format'),
      (value) => {
        if (!value || !value[0])
          return true; 

        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          value[0].type,
        );
      },
    ),
    gender: Yup.string().required(t('select_gender')),
    name: Yup.string()
      .max(20, t('name_max_length'))
      .matches(/^[A-Za-zA-Яа-яЁё\s]+$/, t('name_letters_only'))
      .required(t('name_required')),
    email: Yup.string()
      .email(t('invalid_email_format'))
      .required(t('email_required')),
    weight: Yup.number()
      .typeError(t('weight_type_error')) 
      .positive(t('weight_positive')) 
      .required(t('weight_required'))
      .min(1, t('weight_min')) 
      .max(500, t('weight_max')),
    sportTime: Yup.number()
      .typeError(t('sport_time_number')) 
      .min(0, t('sport_time_negative'))
      .required(t('sport_time_required'))
      .max(24, t('sport_time_max')),
    waterIntake: Yup.number()
      .typeError(t('water_intake_number')) 
      .positive(t('water_intake_positive'))
      .required(t('water_intake_required'))
      .min(0, t('water_intake_min'))
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    watch,
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
  const [calculatedWaterAmount, setCalculatedWaterAmount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const calculateWaterNorm = (weight, time, gender) => {
    if (gender === 'woman') {
      return (weight * 0.03 + time * 0.4).toFixed(2);
    } else if (gender === 'man') {
      return (weight * 0.04 + time * 0.6).toFixed(2);
    }
    return null;
  };

  const watchedWeight = watch('weight');
  const watchedSportTime = watch('sportTime');
  const watchedGender = watch('gender');

  useEffect(() => {
    const waterNorm = calculateWaterNorm(
      Number(watchedWeight) || 0,
      Number(watchedSportTime) || 0,
      watchedGender,
    );
    setCalculatedWaterAmount(waterNorm);
  }, [watchedWeight, watchedSportTime, watchedGender]);

  const onSubmit = (data) => {
    setIsDisabled(true);

    console.log(data);

    dispatch(
      updateUser({
        name: data.name,
        email: data.email,
        gender: data.gender,
        weight: data.weight,
        activeSportTime: data.sportTime,
        dailyNorma: data.waterIntake * 1000,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(t('data_update_success'), {
          duration: 2000,
        });
        setTimeout(() => {
          setIsDisabled(false);
          onClose(MODAL_NAME.SETTINGS_MODAL);
        }, 2000);
      })
      .catch((error) => {
        setIsDisabled(false);

        console.log(error);
        toast.error(t('data_update_failure'));
      });
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

  return (
    <div className={css.scrollableContent}>
      <div className={css.uploadWrapper}>
        <img
          className={css.avatar}
          src={avatarPreview || defaultAvatar}
          alt={t('avatar_preview')}
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
            {t('upload_photo')}
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
                <p className={css.boldText}>{t('gender_identity')}</p>
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
                    {t('woman')}
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
                    {t('man')}
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
                  {t('your_name')}
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
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  onBlur={() => trigger('email')}
                  className={`${css.inputs}`}
                />
                {errors.email && (
                  <p className={css.errorMessage}>{errors.email.message}</p>
                )}
              </div>
              <div className={css.formulaContainer}>
                <p className={`${css.boldText} ${css.smallGap}`}>
                  {t('my_daily_norm')}
                </p>
                <div className={`${css.formulaWrapper} ${css.smallGap}`}>
                  <div className={css.formulaBlock}>
                    <p className={`${css.text} ${css.miniGap}`}>
                      {t('for_woman')}:
                    </p>
                    <p className={`${css.text} ${css.formula}`}>
                      V=(M*0,03) + (T*0,4)
                    </p>
                  </div>
                  <div className={css.formulaBlock}>
                    <p className={`${css.text} ${css.miniGap}`}>
                      {t('for_man')}:
                    </p>
                    <p className={`${css.text} ${css.formula}`}>
                      V=(M*0,04) + (T*0,6)
                    </p>
                  </div>
                </div>
                <p className={`${css.spanText} ${css.text} ${css.smallGap}`}>
                  <span className={css.specialSign}>*</span>{' '}
                  {t('volume_description')}
                </p>
                <span className={`${css.activeTimeWrapper} ${css.bigGap}`}>
                  <svg className={css.iconExclamationMark}>
                    <use href={`${sprite}#icon-exclamation-mark`}></use>
                  </svg>
                  <p className={css.text}>{t('active_time')}</p>
                </span>
              </div>
            </div>
  
            <div className={css.rightSide}>
              <div className={css.waterWrapper}>
                <label
                  htmlFor="weight"
                  className={`${css.inputLabel} ${css.text}`}
                >
                  {t('your_weight')}
                </label>
                <input
                  type="number"
                  id="weight"
                  {...register('weight', {
                    valueAsNumber: true,
                    required: true,
                    min: 1,
                  })}
                  onBlur={() => trigger('weight')}
                  className={`${css.inputs} ${css.smallGap}`}
                  step="0.01"
                  onKeyDown={(e) => {
                    if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.weight && (
                  <p className={css.errorMessage}>{errors.weight.message}</p>
                )}
  
                <label
                  htmlFor="sportTime"
                  className={`${css.inputLabel} ${css.text}`}
                >
                  {t('active_participation')}
                </label>
                <input
                  type="number"
                  id="sportTime"
                  {...register('sportTime', {
                    valueAsNumber: true,
                    min: 0,
                    required: t('sport_time_required'),
                  })}
                  onBlur={() => trigger('sportTime')}
                  className={`${css.inputs} ${css.bigGap}`}
                  onKeyDown={(e) => {
                    if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.sportTime && (
                  <p className={css.errorMessage}>{errors.sportTime.message}</p>
                )}
              </div>
  
              <div className={css.waterWrapper}>
                <div className={`${css.litersWrapper} ${css.smallGap}`}>
                  <p className={css.text}>{t('required_water_amount')}</p>
                  <p className={`${css.spanWaterAmount} ${css.text}`}>
                    {calculatedWaterAmount
                      ? `${calculatedWaterAmount}${t('liters')}`
                      : `2${t('liters')}`}
                  </p>
                </div>
                <label
                  htmlFor="waterIntake"
                  className={`${css.boldText} ${css.inputLabel}`}
                >
                  {t('water_intake')}
                </label>
                <input
                  type="number"
                  id="waterIntake"
                  {...register('waterIntake', {
                    valueAsNumber: true,
                    min: 0,
                    required: t('water_intake_required'),
                  })}
                  onBlur={() => trigger('waterIntake')}
                  className={`${css.inputs}`}
                  step="0.01"
                  onKeyDown={(e) => {
                    if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                  value={watch('waterIntake') ? (watch('waterIntake') / 1000).toFixed(1) : ''} 
                />
                {errors.waterIntake && (
                  <p className={css.errorMessage}>
                    {errors.waterIntake.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className={css.button} disabled={isDisabled}>
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}
   export default   UserSettingsForm