import React from 'react';
import get from 'lodash/get';
import { FormikValues, useFormikContext } from 'formik';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@components';
import { cn } from '@utils';
import { productStyles } from '@presentation/mocks';

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  htmlFor?: string;
};

export const SelectProductStyle: React.FC<Props> = ({
  label,
  name,
  placeholder,
  htmlFor = name,
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const inputValue = get(values, name, '');

  return (
    <div className={cn(['grid w-full items-center gap-1.5'])}>
      <Label
        htmlFor={htmlFor}
        className={get(errors, name) ? 'text-red-500' : ''}
      >
        {label}
      </Label>
      <Select value={inputValue} onValueChange={(e) => setFieldValue(name, e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {productStyles.map((style) => (
            <SelectItem key={style.value} value={style.value}>
              {style.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="h-2 text-xs font-extralight text-red-500">
        {typeof errors[name] === 'string' ? errors[name] : null}
      </div>
    </div>
  );
};
