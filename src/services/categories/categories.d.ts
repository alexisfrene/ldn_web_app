type CategoryValue = {
  icon_url: string;
  value: string;
  id: string;
};

type Category = {
  title: string;
  values: CategoryValue[];
  category_id: number;
};

// Si es una lista:
type CategoryList = Category[];
