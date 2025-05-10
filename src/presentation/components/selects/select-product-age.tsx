import React from "react";
import { FormikValues, useFormikContext } from "formik";
import get from "lodash/get";
import { cn } from "@utils";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { productAges } from "@presentation/mocks";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  htmlFor?: string;
};

export const SelectProductAge: React.FC<Props> = ({
  label,
  name,
  placeholder,
  htmlFor = name,
}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const inputValue = get(values, name, "");

  return (
    <div className={cn(["grid w-full items-center gap-1.5"])}>
      <Label
        htmlFor={htmlFor}
        className={get(errors, name) ? "text-red-500" : ""}
      >
        {label}
      </Label>
      <Select value={inputValue} onValueChange={(e) => setFieldValue(name, e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {productAges.map((age) => (
            <SelectItem key={age.value} value={age.value}>
              {age.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="h-2 text-xs font-extralight text-red-500">
        {typeof errors[name] === "string" ? errors[name] : null}
      </div>
    </div>
  );
};
