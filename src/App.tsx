import React, { Suspense, useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { Toaster } from "@ui/sonner";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { RouterProvider } from "react-router-dom";
import { API_NAME } from "@config/environment";
import router from "@presentation/pages";

const App: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  NProgress.configure({ showSpinner: false, speed: 500 });
  const isFetching = useIsFetching();

  useEffect(() => {
    if (isFetching > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const { data } = await axios.get(`${API_NAME}/test`);
        setServerStatus(data?.server === "on");
      } catch (error) {
        console.error("Error checking server status:", error);
        setErrorMessage(
          "No se pudo conectar al servidor. Por favor, intenta más tarde.",
        );
        setServerStatus(false);
      }
    };

    checkServerStatus();
  }, []);

  if (serverStatus === false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-t from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-900">
        <h1 className="mb-4 text-3xl font-bold">Servidor no disponible</h1>
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <p>Por favor, intenta de nuevo más tarde.</p>
        )}
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="bg-gradient-to-t from-orange-100 to-orange-100 font-mono font-semibold text-slate-800 dark:from-slate-600 dark:to-slate-900">
        {serverStatus === true ? <RouterProvider router={router} /> : null}
      </div>
      <Toaster />
    </Suspense>
  );
};

export default App;
