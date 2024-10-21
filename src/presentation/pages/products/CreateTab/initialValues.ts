const initialValues = {
  name: '',
  images: [] as ImagesValues[],
  price: 1,
  description: '',
  detail: { age: '', brand: '', color: '', gender: '', style: '' },
  stock: 1,
  category: {
    category_id: '',
    category_value_id: '',
  },
  size: {
    size_id: '',
    size_value_id: '',
  },
};

export default initialValues;
