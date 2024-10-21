import React from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { capitalizeFirstLetter } from '@lib';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';

interface Props {
  title: string;
  options: {
    type: string;
    title: string;
  }[];
  name: string;
}

export const DropdownInput: React.FC<Props> = ({ title, options, name }) => {
  const formik = useFormikContext();
  const field = formik.getFieldProps(name);

  const handleOptionChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Select
      {...field}
      onValueChange={handleOptionChange}
      defaultValue={options[0].type}
    >
      <Label>{title}</Label>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.type} key={option.type}>
            {capitalizeFirstLetter(option.title)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const FieldForm: React.FC<FieldFormProps> = ({
  name,
  title,
  option,
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps<string>) => (
        <DropdownInput title={title} options={option} name={field.name} />
      )}
    </Field>
  );
};
