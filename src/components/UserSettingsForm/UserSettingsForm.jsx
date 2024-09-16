import css from './UserSettingsForm.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sprite from '../../images/sprite.svg';

const VALIDATION_SCHEMA = Yup.object().shape({
  avatar: Yup.mixed()
    .test('fileSize', 'File is too large', (value) => {
      return value && value[0] && value[0].size <= 6000000; // 6MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return (
        value &&
        value[0] &&
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          value[0].type,
        )
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

const UserSettingsForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(VALIDATION_SCHEMA),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
    //send data to the server
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {avatarPreview && (
          <img
            className={css.avatar}
            src={avatarPreview}
            alt="Avatar preview"
            width="75"
            height="75"
            loading="lazy"
          />
        )}
        <div className={css.inputWrapper}>
          <svg className={css.uploadPhotoIcon}>
            <use href={`${sprite}#icon-upload`}></use>
          </svg>
          <input
            className={css.hiddenInput}
            type="file"
            id="avatar"
            accept="image/*"
            {...register('avatar')}
            onChange={handleAvatarChange}
          />
          <label className={`${css.inputLabel} ${css.text}`} htmlFor="avatar">
            Upload a photo
          </label>
          {errors.avatar && (
            <p className={css.errorMessage}>{errors.avatar.message}</p>
          )}
        </div>

        <div className={css.bigGap}>
          <p className={css.boldText}>Your gender identity</p>
          <div className={css.radioContainer}>
            <input
              type="radio"
              id="woman"
              value="woman"
              {...register('gender')}
              defaultChecked
            />
            <label htmlFor="woman" className={`${css.genderLabel} ${css.text}`}>
              Woman
            </label>
            <input type="radio" id="man" value="man" {...register('gender')} />
            <label htmlFor="man" className={`${css.genderLabel} ${css.text}`}>
              Man
            </label>
            {errors.gender && (
              <p className={css.errorMessage}>{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className={`${css.userDataWrapper} ${css.bigGap}`}>
          <label htmlFor="name" className={`${css.boldText} ${css.inputLabel}`}>
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

        <div>
          <p className={`${css.boldText} ${css.smallGap}`}>My daily norma</p>
          <p className={`${css.text} ${css.miniGap}`}>For woman:</p>
          <p className={`${css.text} ${css.formula}  ${css.formulaGap}`}>
            V=(M*0,03) + (T*0,4)
          </p>
          <p className={`${css.text} ${css.miniGap}`}>For man:</p>
          <p className={`${css.text} ${css.formula} ${css.smallGap}`}>
            V=(M*0,04) + (T*0,6)
          </p>
          <p className={css.spanText}>
            * V is the volume of the water norm in liters per day, M is your
            body weight, T is the time of active sports, or another type of
            activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </p>
          <span>
            <svg className={css.iconExclamationMark}>
              <use href={`${sprite}#icon-exclamation-mark`}></use>
            </svg>
            <p>Active time in hours</p>
          </span>
        </div>

        <div>
          <label htmlFor="weight">Your weight in kilograms:</label>
          <input
            type="number"
            id="weight"
            {...register('weight')}
            onBlur={() => trigger('weight')}
          />
          {errors.weight && (
            <p className={css.errorMessage}>{errors.weight.message}</p>
          )}
          <label htmlFor="sportTime">
            The time of active participation in sports:
          </label>
          <input
            type="number"
            id="sportTime"
            {...register('sportTime')}
            onBlur={() => trigger('sportTime')}
          />
          {errors.sportTime && (
            <p className={css.errorMessage}>{errors.sportTime.message}</p>
          )}
        </div>

        <div>
          <p>The required amount of water in liters per day:</p>
          <p>{/* required amount of water */}L</p>
          <label htmlFor="waterIntake" className={css.boldText}>
            Write down how much water you will drink:
          </label>
          <input
            type="number"
            id="waterIntake"
            {...register('waterIntake')}
            onBlur={() => trigger('waterIntake')}
          />
          {errors.waterIntake && (
            <p className={css.errorMessage}>{errors.waterIntake.message}</p>
          )}
        </div>
        <button type="submit" className={css.button}>
          Save
        </button>
      </div>
    </form>
  );
};

export default UserSettingsForm;
