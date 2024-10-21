import React, { useState } from 'react';
import { useSessionStore } from '@global';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  ImageLoader,
  ImageUploader,
} from '@components';
import { changeAvatar } from '@services';
import { Formik } from 'formik';

export const AvatarEdit: React.FC = () => {
  const [image, setImage] = useState<ImagesValues[]>([]);

  const avatar = useSessionStore((state) => state.avatar);
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar avatar :</CardTitle>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="relative">
              <Icons
                type="copy_manual"
                height={30}
                className="absolute right-0 bg-slate-200 dark:bg-slate-800"
              />
              <ImageLoader alt="avatar" url={avatar} height={40} width={40} />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sube una imagen :</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente y la imagen anterior sera eliminada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Formik
              initialValues={{
                value: '',
                avatar: null as File | null,
                avatar_url: '',
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
                      setFieldValue('avatar', image[0].file);
                      setFieldValue('avatar_url', image[0].url);
                      setImage([]);
                    }}
                  />
                  {values.avatar_url && (
                    <ImageLoader url={values.avatar_url} alt="Avatar" />
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
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
