type ImagesValues = {
  url: string;
  file: File;
  id: string;
};

type initialValues = {
  category: {
    category_id: string;
    category_value_id: string;
  };
  title: string;
  label: string;
  images: ImagesValues[];
};
