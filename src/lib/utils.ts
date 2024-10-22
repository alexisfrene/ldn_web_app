import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const getToken = () => {
  const localStorageUserData = localStorage.getItem('user-storage');
  const parsedDataUser =
    typeof localStorageUserData === 'string'
      ? JSON?.parse(localStorageUserData || '')
      : null;
  return parsedDataUser?.state?.session_token || '';
};

const axiosInstanceCreate = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_NAME,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstanceFormDataCreate = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_NAME,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = axiosInstanceCreate();

export const axiosInstanceFormData = axiosInstanceFormDataCreate();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchImage = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' });
  return URL.createObjectURL(response.data);
};

export const formatDate = (date: {
  getFullYear: () => any;
  getMonth: () => number;
  getDate: () => any;
}) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formattedValue = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value);

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
