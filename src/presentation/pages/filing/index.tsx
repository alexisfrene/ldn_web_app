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
      <Card className="mx-56 my-20">
        <CardHeader>
          <CardTitle className="text-center">Acción a realizar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-10">
          {!sessionToken ? (
            <>
              <div className="flex h-40 w-96 cursor-pointer flex-col justify-center border-2 px-14">
                <CardDescription className="my-3 text-center">
                  Crear una cuenta
                </CardDescription>
                <Button onClick={() => navigate('/signup')}>Registrarme</Button>
              </div>
              <div className="flex h-40 w-96 cursor-pointer flex-col justify-center border-2 px-14">
                <CardDescription className="my-3 text-center">
                  Iniciar sesión
                </CardDescription>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Filing;
