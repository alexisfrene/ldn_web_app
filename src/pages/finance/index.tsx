import React from "react";
import { TabsComponent } from "@common/TabsComponent";

const FinanceTabs = [
  {
    path: "/app/finance/info",
    label: "General",
  },
  {
    path: "/app/finance/movement",
    label: "Movimientos",
  },
  {
    path: "/app/finance/financial-account",
    label: "Cuentas",
  },
  {
    path: "/app/finance/debts",
    label: "Deudas",
  },
  {
    path: "/app/finance/expenses",
    label: "Gastos",
  },
];

const Finance: React.FC = () => {
  return <TabsComponent tabs={FinanceTabs} />;
};

export default Finance;
