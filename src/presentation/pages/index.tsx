import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { WithAuth } from '@components';

const FilingPage = lazy(() => import('./filing'));
const SingUpPage = lazy(() => import('./sign'));
const HomePage = lazy(() => import('./home'));
const LoginPage = lazy(() => import('./login'));
const ErrorPage = lazy(() => import('./error'));
const ConfigPage = lazy(() => import('./config'));
const FinancePage = lazy(() => import('./finance'));
const ProductsPage = lazy(() => import('./products'));
const VariationsPage = lazy(() => import('./variations'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FilingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/app',
    element: (
      <WithAuth>
        <HomePage />
      </WithAuth>
    ),
    children: [
      {
        path: 'finance',
        element: <FinancePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'variations',
        element: <VariationsPage />,
      },
      {
        path: 'config',
        element: <ConfigPage />,
      },
    ],
    errorElement: <ErrorPage />,
    hasErrorBoundary: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SingUpPage />,
  },
]);
