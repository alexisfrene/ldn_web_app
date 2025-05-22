import React from "react";
import { Field, Form, Formik } from "formik";
import { useSessionStore } from "src/global";
import { z } from "zod";
import { zodToFormikValidate } from "@utils";
import { FileWithPreview } from "@hooks/use-file-upload";
import { AlertDialogCancel, AlertDialogFooter } from "@ui/alert-dialog";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import { changeAvatar } from "@users-services/index";

interface FormValues {
  avatar: FileWithPreview[] | null;
}

const schema = z.object({
  avatar: z
    .array(z.any())
    .min(1, "Debes seleccionar una imagen")
    .nullable()
    .refine(
      (files) => files === null || files.every((f) => f.file instanceof File),
      {
        message: "Archivo inválido",
      },
    ),
});

export const UpdateAvatarForm: React.FC = () => {
  const insertAvatar = useSessionStore((state) => state.insertAvatar);

  const initialValues: FormValues = {
    avatar: null,
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validate={zodToFormikValidate(schema)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const file = values.avatar?.[0]?.file;
          if (file instanceof File) {
            const res = await changeAvatar(file);
            insertAvatar(res.url);
          }
        } catch (error) {
          console.error("Error al cambiar el avatar:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Field
              name="avatar"
              as={FileUpload}
              accept="image/*"
              maxSizeMB={10}
            />
            {errors.avatar && touched.avatar && (
              <p className="text-sm text-red-500">{errors.avatar}</p>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>
                Cancelar
              </AlertDialogCancel>

              <LoadingButton
                type="submit"
                loading={isSubmitting}
                disabled={!values.avatar?.length || isSubmitting}
              >
                Guardar
              </LoadingButton>
            </AlertDialogFooter>
          </div>
        </Form>
      )}
    </Formik>
  );
};
