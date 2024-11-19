import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@global';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from '@components';

const Filing: React.FC = () => {
  const navigate = useNavigate();
  const sessionToken = useSessionStore((state) => state.session_token);

  useEffect(() => {
    if (sessionToken) {
      navigate('/app/finance');
    }
  }, [sessionToken, navigate]);

  return (
    <Layout>
      <Card className="sm:mx-56 sm:my-20">
        <CardHeader>
          <CardTitle className="text-center">Acción a realizar</CardTitle>
        </CardHeader>
        <CardContent className="sm:flex sm:justify-center sm:gap-10">
          {!sessionToken ? (
            <>
              <div className="cursor-pointer flex-col justify-center px-14 sm:flex sm:h-40 sm:w-96 sm:border-2">
                <CardDescription className="my-3 text-center">
                  Crear una cuenta
                </CardDescription>
                <Button onClick={() => navigate('/signup')} className="w-full">
                  Registrarme
                </Button>
              </div>
              <div className="cursor-pointer flex-col justify-center px-14 sm:flex sm:h-40 sm:w-96 sm:border-2">
                <CardDescription className="my-3 text-center">
                  Iniciar sesión
                </CardDescription>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Login
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Filing;
