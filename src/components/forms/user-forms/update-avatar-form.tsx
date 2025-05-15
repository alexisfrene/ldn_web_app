import React, { useState } from "react";
import { Formik } from "formik";
import { useSessionStore } from "src/global";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@ui/alert-dialog";
import { ImageLoader } from "@components/common2/image-loader";
import { ImageUploader } from "@components/common2/image-uploader";
import { changeAvatar } from "@users-services/index";

export const UpdateAvatarForm: React.FC = () => {
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  const [image, setImage] = useState<ImagesValues[]>([]);
  return (
    <Formik
      initialValues={{
        value: "",
        avatar: null as File | null,
        avatar_url: "",
      }}
      onSubmit={async (values) => {
        if (values.avatar) {
          const res = await changeAvatar(values.avatar);
          insertAvatar(res.url);
        }
        setImage([]);
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <>
          <ImageUploader
            name="avatar"
            images={image}
            setImages={setImage}
            onChange={() => {
              setFieldValue("avatar", image[0].file);
              setFieldValue("avatar_url", image[0].url);
              setImage([]);
            }}
          />
          {values.avatar_url && (
            <div className="flex items-center justify-center">
              <ImageLoader
                url={values.avatar_url}
                alt="Avatar"
                className="h-40 w-40 rounded-full object-cover"
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      )}
    </Formik>
  );
};
