export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"],
  detail: (id: string) => [...usersKeys.all, "detail", id],
  preference: ["preference"],
};

export const productKeys = {
  all: ["products"] as const,
  list: () => [...productKeys.all, "list"],
  detail: (id: string) => [...productKeys.all, "detail", id],
};

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"],
  detail: (id: string) => [...categoryKeys.all, "detail", id],
};

export const sizeKeys = {
  all: ["sizes"] as const,
  list: () => [...sizeKeys.all, "list"],
  detail: (id: string) => [...sizeKeys.all, "detail", id],
};

export const variationKeys = {
  all: ["variations"] as const,
  list: () => [...variationKeys.all, "list"],
  detail: (id: string) => [...sizeKeys.all, "detail", id],
};

export const brandKeys = {
  all: ["brands"] as const,
  list: () => [...brandKeys.all, "list"],
  detail: (id: string) => [...brandKeys.all, "detail", id],
};

export const financeKeys = {
  expense: {
    all: ["expenses"] as const,
    list: () => [...financeKeys.expense.all, "list"],
    detail: (id: string) => [...financeKeys.expense.all, "detail", id],
  },
  movement: {
    all: ["movements"] as const,
    list: () => [...financeKeys.movement.all, "list"],
    detail: (id: string) => [...financeKeys.movement.all, "detail", id],
    pages: (page?: number, limit?: number) => [
      ...financeKeys.movement.all,
      page ?? 1,
      limit ?? 10,
    ],
  },
  financial_account: {
    all: ["financial_accounts"] as const,
    list: () => [...financeKeys.financial_account.all, "list"],
    detail: (id: string) => [
      ...financeKeys.financial_account.all,
      "detail",
      id,
    ],
    pages: (page?: number, limit?: number) => [
      ...financeKeys.financial_account.all,
      page ?? 1,
      limit ?? 10,
    ],
  },
  payment_method: {
    all: ["payment_methods"] as const,
    list: () => [...financeKeys.payment_method.all, "list"],
    detail: (id: string) => [...financeKeys.payment_method.all, "detail", id],
    by_account: (id: string) => [
      ...financeKeys.payment_method.all,
      "by-account",
      id,
    ],
  },
  debt: {
    all: ["debts"] as const,
    list: () => [...financeKeys.debt.all, "list"],
    detail: (id: string) => [...financeKeys.debt.all, "detail", id],
    pages: (page?: number, limit?: number) => [
      ...financeKeys.debt.all,
      page ?? 1,
      limit ?? 10,
    ],
  },
  installment: {
    all: ["installments"] as const,
    list: () => [...financeKeys.installment.all, "list"],
    detail: (id: string) => [...financeKeys.installment.all, "detail", id],
  },
  statistics: {
    all: ["statistics"] as const,
    list: () => [...financeKeys.statistics.all, "list"],
    detail: (id: string) => [...financeKeys.statistics.all, "detail", id],
  },
};
