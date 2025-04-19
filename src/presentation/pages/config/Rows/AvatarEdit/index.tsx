import React, { useState } from 'react';
import { Formik } from 'formik';
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
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  ImageLoader,
  ImageUploader,
  TokenImage,
} from '@components';
import { changeAvatar } from '@services';

export const AvatarEdit: React.FC = () => {
  const [image, setImage] = useState<ImagesValues[]>([]);

  const avatar = useSessionStore((state) => state.avatar);
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  return (
    <Card className="w-72 border-none">
      <CardHeader>
        <CardTitle>Editar avatar :</CardTitle>
        <CardDescription>
          Cambia tu imagen de perfil, esta imagen se mostrara en la app.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="relative">
              <Icons
                type="copy_manual"
                height={30}
                className="absolute right-0 bg-slate-200 dark:bg-slate-800"
              />
              <TokenImage
                url={`${avatar}?width=150&height=150&quality=50&format=webp`}
                variant="default"
                skeletonWidth={150}
                skeletonHeight={150}
                className="rounded-3xl"
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="">
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
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
