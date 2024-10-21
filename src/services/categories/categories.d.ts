interface Category {
  category_id: string;
  title: string;
  values: Value[];
  user_id: string;
}

interface Value {
  id: string;
  value: string;
  icon_url?: string;
  icon: {
    url: String;
    file: File;
  };
}
