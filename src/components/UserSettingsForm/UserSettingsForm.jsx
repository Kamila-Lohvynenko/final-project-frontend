import css from "./UserSettingsForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sprite from "../../images/sprite.svg";

const VALIDATION_SCHEMA = Yup.object().shape({
  avatar: Yup.mixed()
    .test("fileSize", "File is too large", (value) => {
      return value && value[0] && value[0].size <= 6000000; // 6MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          value[0].type
        )
      );
    }),
  gender: Yup.string().required("Please select gender"),
});

const UserSettingsForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(VALIDATION_SCHEMA) });

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
        <label className={css.inputLabel} htmlFor="avatar">
          Upload a photo
        </label>
        <svg className={css.uploadPhotoIcon}>
          <use href={`${sprite}#icon-upload`}></use>
        </svg>
        <input
          className={css.hiddenInput}
          type="file"
          id="avatar"
          accept="image/*"
          {...register("avatar")}
          onChange={handleAvatarChange}
        />
        {errors.avatar && <p className={css.errors}>{errors.avatar.message}</p>}
      </div>

      <div>
        <p>Your gender identity</p>
        <div>
          <input
            type="radio"
            id="woman"
            value="woman"
            {...register("gender")}
          />
          <label htmlFor="woman">Woman</label>
          <input type="radio" id="man" value="man" {...register("gender")} />
          <label htmlFor="man">Man</label>
          {errors.gender && (
            <p className={css.errors}>{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div></div>
    </form>
  );
};

export default UserSettingsForm;
