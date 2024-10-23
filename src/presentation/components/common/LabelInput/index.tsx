import React from 'react';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input, Label } from '@components';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  inputType?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
}

export const LabelInput: React.FC<Props> = ({
  onChange,
  label,
  name,
  inputType = 'text',
  maxLength = 255,
  minLength = 1,
  min = undefined,
  max = undefined,
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();
  const path = name.split(/\[|\]\./).filter(Boolean);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(e);
    }
    if (path.length > 1) {
      const [parent, child] = path;
      setFieldValue(parent, {
        ...values[parent],
        [child]: value,
      });
    } else {
      setFieldValue(name, value);
    }
  };
  const inputValue =
    path.length > 1 ? values[path[0]]?.[path[1]] || '' : values[name] || '';

  return (
    <Label htmlFor={label}>
      <span className={errors[name] ? 'text-red-600' : ''}> {label} :</span>
      <Input
        onChange={handleChange}
        type={inputType}
        value={inputValue}
        className={errors[name] ? 'border-red-600' : ''}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
      />
      <p className="my-1 h-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
    </Label>
  );
};
