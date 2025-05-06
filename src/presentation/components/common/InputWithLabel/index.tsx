import React from 'react';
import { Label, Input, Textarea } from '@components';
import { cn } from '@utils';
import { FormikValues, useFormikContext } from 'formik';
import { get } from 'lodash';

type Props = {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  label: string;
  name: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  step?: string;
  htmlFor?: string;
  textarea?: boolean;
  className?: string;
};

export const InputWithLabel: React.FC<Props> = ({
  onChange,
  label,
  name,
  type = 'text',
  maxLength = 255,
  minLength = 1,
  min = undefined,
  max = undefined,
  placeholder,
  disabled = false,
  step,
  htmlFor = name,
  textarea = false,
  className = '',
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const inputValue = get(values, name, '');

  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFieldValue(name, e.target.value);

  return (
    <div className={cn(['grid w-full items-center gap-1.5', className])}>
      <Label
        htmlFor={htmlFor}
        className={get(errors, name) ? 'text-red-500' : ''}
      >
        {label}
      </Label>
      {textarea ? (
        <Textarea
          onChange={handleChange}
          value={inputValue}
          placeholder={placeholder}
          className={
            get(errors, name)
              ? 'focus-visible:ring-ring border-red-500 ring-0 focus-visible:ring-0'
              : ''
          }
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
        />
      ) : (
        <Input
          onChange={handleChange}
          type={type}
          value={inputValue}
          placeholder={placeholder}
          className={
            get(errors, name)
              ? 'focus-visible:ring-ring border-red-500 ring-0 focus-visible:ring-0'
              : ''
          }
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          disabled={disabled}
          step={step}
        />
      )}

      <div className="h-2 text-xs font-extralight text-red-500">
        {typeof errors[name] === 'string' ? errors[name] : null}
      </div>
    </div>
  );
};
