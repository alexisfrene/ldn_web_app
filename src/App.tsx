import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import router from '@presentation/pages';
import NProgress from 'nprogress';
import { Toaster } from '@components';

import 'nprogress/nprogress.css';
const App: React.FC = () => {
  NProgress.configure({ showSpinner: false, speed: 500 });
  const isFetching = useIsFetching();

  useEffect(() => {
    if (isFetching > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  return (
    <Suspense fallback={null}>
      <div className="bg-gradient-to-t from-orange-100 to-orange-100 font-mono font-semibold text-slate-800 dark:from-slate-600 dark:to-slate-900">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </Suspense>
  );
};

export default App;
