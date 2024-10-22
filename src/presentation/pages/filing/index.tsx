import React from 'react';
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
  return (
    <Layout>
      <Card className="mx-48 my-10">
        <CardHeader>
          <CardTitle className="text-center">Acción a realizar </CardTitle>
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
          ) : (
            <div className="flex h-40 w-96 flex-col justify-center border-2 px-14">
              <CardDescription>Estas logueado con el usuario :</CardDescription>
              <div className="m-3 flex gap-5 bg-slate-200 p-3 text-center text-lg font-bold text-blue-600 dark:bg-slate-900">
                Estas loqueado !
              </div>
              <Button
                onClick={() => navigate('/app/finance')}
                variant="outline"
              >
                Ir a la <span className="p-3 text-blue-600">Home</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Filing;
