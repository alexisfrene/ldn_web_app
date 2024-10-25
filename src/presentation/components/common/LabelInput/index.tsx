import React from 'react';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input, Label } from '@components';
import { get } from 'lodash';

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

  const inputValue = get(values, name, '');

  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, e.target.value);

  return (
    <Label htmlFor={label}>
      <span className={get(errors, name) ? 'text-red-600' : ''}>{label} :</span>
      <Input
        onChange={handleChange}
        type={inputType}
        value={inputValue}
        className={get(errors, name) ? 'border-red-600' : ''}
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
