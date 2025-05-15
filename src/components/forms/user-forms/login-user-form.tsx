import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "src/global";
import { Button } from "@ui/button";
import { InputWithLabel } from "@common/InputWithLabel";
import { loginUser } from "@users-services/index";

export const LoginUserForm: React.FC = () => {
  const navigate = useNavigate();
  const insertSessionToken = useSessionStore(
    (state) => state.insertSessionToken,
  );

  return (
    <Formik
      initialValues={{
        email_or_user: "",
        password: "",
      }}
      onSubmit={async (values) => {
        const res = await loginUser(values);

        if (res?.data.session_token) {
          insertSessionToken(res?.data.session_token);
          return setTimeout(() => navigate("/app/finance"), 200);
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Email/Username"
            name="email_or_user"
            placeholder="Ej : juanperez003"
          />
          <InputWithLabel
            label="Contraseña"
            name="password"
            placeholder="********"
            type="password"
          />
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Register
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
