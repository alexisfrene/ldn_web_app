import React from 'react';
import { Label, Input } from '@components';
import { cn } from '@utils';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { get } from 'lodash';

type Props = {
  className?: string;
  label?: string;
  id?: string;
  htmlFor?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
};

export const InputWithLabel: React.FC<Props> = ({
  className,
  label,
  id,
  type,
  placeholder,
  name,
  onChange,
  htmlFor,
  disabled,
  props,
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const inputValue = get(values, name, '');

  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, e.target.value);
  return (
    <div className={cn(['grid w-full items-center gap-1.5', className])}>
      <Label
        htmlFor={htmlFor}
        className={get(errors, name) ? 'text-red-600' : ''}
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={inputValue}
        disabled={disabled}
        className={
          get(errors, name)
            ? 'focus-visible:ring-ring border-red-600 ring-0 focus-visible:ring-0'
            : ''
        }
        {...props}
      />
      <ErrorMessage name={name} className="my-1 h-1 text-xs text-red-600" />
    </div>
  );
};
