type GenderProduct = 'male' | 'female' | 'unspecified';
type UUID = `${string}-${string}-${string}-${string}-${string}`;

type values = {
  label: string;
  id: string;
  images: string[];
};

interface Variants {
  variation_id: string;
  title: string;
  values: values[];
}
