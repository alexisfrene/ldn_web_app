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

const axiosInstanceCreate = (contentType: string) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_NAME,
    headers: {
      'Content-Type': contentType,
    },
    timeout: 2000,
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
export const axiosInstance = axiosInstanceCreate('application/json');

export const axiosInstanceFormData = axiosInstanceCreate('multipart/form-data');

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

export const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string,
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == 'undefined' || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};
interface LengthObject {
  value: number;
  unit: string;
}

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  '%': true,
};
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === 'number') {
    return {
      value: size,
      unit: 'px',
    };
  }
  let value: number;
  const valueString: string = (size.match(/^[0-9.]*/) || '').toString();
  if (valueString.includes('.')) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit: string = (size.match(/[^0-9]*$/) || '').toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    };
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`,
  );

  return {
    value,
    unit: 'px',
  };
}
export function cssValue(value: number | string): string {
  const lengthWithunit = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
}

enum BasicColors {
  maroon = '#800000',
  red = '#FF0000',
  orange = '#FFA500',
  yellow = '#FFFF00',
  olive = '#808000',
  green = '#008000',
  purple = '#800080',
  fuchsia = '#FF00FF',
  lime = '#00FF00',
  teal = '#008080',
  aqua = '#00FFFF',
  blue = '#0000FF',
  navy = '#000080',
  black = '#000000',
  gray = '#808080',
  silver = '#C0C0C0',
  white = '#FFFFFF',
}
const handleRgbColorString = (color: string, opacity: number): string => {
  if (color.includes('/')) {
    return color.replace('rgb(', 'rgba(');
  }

  const rgbValues = color
    .substring(color.startsWith('rgba(') ? 5 : 4, color.length - 1)
    .trim();
  const splittedByCommas = rgbValues.split(',');

  if (splittedByCommas.length === 4) {
    return color.replace('rgb(', 'rgba(');
  }

  if (splittedByCommas.length === 3) {
    return `rgba(${rgbValues}, ${opacity})`;
  }

  return `rgba(${rgbValues} / ${opacity})`;
};

export const calculateRgba = (color: string, opacity: number): string => {
  if (color.startsWith('rgb')) {
    return handleRgbColorString(color, opacity);
  }

  if (Object.keys(BasicColors).includes(color)) {
    color = BasicColors[color as keyof typeof BasicColors];
  }

  if (color[0] === '#') {
    color = color.slice(1);
  }

  if (color.length === 3) {
    let res = '';
    color.split('').forEach((c: string) => {
      res += c;
      res += c;
    });
    color = res;
  }

  const rgbValues: string = (color.match(/.{2}/g) || [])
    .map((hex: string) => parseInt(hex, 16))
    .join(', ');

  return `rgba(${rgbValues}, ${opacity})`;
};
type InterestProps = {
  totalAmountToPay: number;
  amountReceived: number;
  numberOfInstallments: number;
};
export const calculateInterest = ({
  totalAmountToPay,
  amountReceived,
  numberOfInstallments,
}: InterestProps) => {
  const totalInterest =
    ((totalAmountToPay - amountReceived) / amountReceived) * 100;
  const effectiveInterestPerInstallment =
    (Math.pow(totalAmountToPay / amountReceived, 1 / numberOfInstallments) -
      1) *
    100;

  return { totalInterest, effectiveInterestPerInstallment };
};
