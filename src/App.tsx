import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@presentation/pages';
import { LoadingIndicator, Toaster } from '@components';

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingIndicator isLoading />}>
      <div className="min-w-screen min-h-screen bg-gradient-to-t from-orange-100 to-orange-100 font-mono font-semibold text-slate-800 dark:from-slate-600 dark:to-slate-900">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </Suspense>
  );
};

export default App;
