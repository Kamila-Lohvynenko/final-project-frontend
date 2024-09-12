import css from "./UserSettingsForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  return <form></form>;
};

export default UserSettingsForm;

{
  /* <svg>
      <use href={${sprite}#icon-id} />
    </svg> */
}
