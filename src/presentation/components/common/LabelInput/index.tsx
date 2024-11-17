import React from 'react';
import { get } from 'lodash';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input, Label } from '@components';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  placeholder?: string;
  inputType?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  step?: string;
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
  placeholder,
  disabled = false,
  step,
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const inputValue = get(values, name, '');

  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, e.target.value);

  return (
    <Label htmlFor={label} className="ml-1">
      <div className={get(errors, name) ? 'mb-1.5 text-red-600' : 'mb-1.5'}>
        {label} :
      </div>
      <Input
        onChange={handleChange}
        type={inputType}
        value={inputValue}
        placeholder={placeholder}
        className={
          get(errors, name)
            ? 'border-red-600 ring-0 focus-visible:ring-0 focus-visible:ring-ring'
            : ''
        }
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        disabled={disabled}
        step={step}
      />
      <p className="my-1 h-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
    </Label>
  );
};
