export const useForm = (id: string) => {
  return {
    product_id: id,
    description: '',
    price: '',
    name: '',
    size: {
      size_id: '',
      size_value_id: '',
    },
    category: {
      category_id: '',
      category_value_id: '',
    },
  };
};
