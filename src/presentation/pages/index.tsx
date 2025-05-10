import { lazy } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { WithAuth } from "@components";
import Expense from "./finance/Expense";
import RelevantInfo from "./finance/RelevantInfo";
import ProductGrid from "./products/ViewTab";
import VariantsGrid from "./variations/ViewTab";

const FilingPage = lazy(() => import("./filing"));
const SignUpPage = lazy(() => import("./sign"));
const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./login"));
const ErrorPage = lazy(() => import("./error"));
const ConfigPage = lazy(() => import("./config"));
const FinancePage = lazy(() => import("./finance"));
const ProductsPage = lazy(() => import("./products"));
const VariationsPage = lazy(() => import("./variations"));

const Movement = lazy(() => import("./finance/Movement"));
const AccountFinancial = lazy(() => import("./finance/AccountFinancial"));
const Debts = lazy(() => import("./finance/Debts"));
const CreateProducts = lazy(() => import("./products/CreateProductTab"));
const CreateVariation = lazy(() => import("./variations/CreateVariationTab"));

const FinanceRoutes = [
  {
    index: true,
    element: <Navigate to="/app/finance/info" replace />,
  },
  {
    path: "info",
    element: <RelevantInfo />,
  },
  {
    path: "movement",
    element: <Movement />,
  },
  {
    path: "financial-account",
    element: <AccountFinancial />,
  },
  {
    path: "debts",
    element: <Debts />,
  },
  {
    path: "expenses",
    element: <Expense />,
  },
];
const ProductsRoutes = [
  {
    index: true,
    element: <Navigate to="/app/products/view" replace />,
  },
  {
    path: "view",
    element: <ProductGrid />,
  },
  {
    path: "create-products",
    element: <CreateProducts />,
  },
];
const VariationsRoutes = [
  {
    index: true,
    element: <Navigate to="/app/variations/view" replace />,
  },
  {
    path: "view",
    element: <VariantsGrid />,
  },
  {
    path: "create-variations",
    element: <CreateVariation />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <FilingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: (
      <WithAuth>
        <HomePage />
      </WithAuth>
    ),
    errorElement: <ErrorPage />,
    hasErrorBoundary: true,
    children: [
      {
        index: true,
        element: <Navigate to="/app/finance" replace />,
      },
      {
        path: "finance",
        element: <FinancePage />,
        children: FinanceRoutes,
      },
      {
        path: "schedule",
        element: <div className="mt-96 text-center">Próximamente ...</div>,
      },
      {
        path: "products",
        element: <ProductsPage />,
        children: ProductsRoutes,
      },
      {
        path: "variations",
        element: <VariationsPage />,
        children: VariationsRoutes,
      },
      {
        path: "config",
        element: <ConfigPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
