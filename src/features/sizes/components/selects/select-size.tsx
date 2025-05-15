import React from "react";
import { FormikValues, useFormikContext } from "formik";
import { cn } from "@utils";
import { useGetSizes } from "@sizes-hooks/use-get-sizes";

export const SelectSize: React.FC = () => {
  const { sizes } = useGetSizes();
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  return (
    <div>
      {sizes.map((size) => {
        return (
          <div key={size.size_id} className="my-3">
            {size.title}
            <div className="flex gap-3">
              {size.values.map((value) => {
                return (
                  <div
                    key={value.id}
                    className={cn([
                      "flex items-center gap-3 bg-slate-700 rounded-xl p-3 hover:bg-slate-800 cursor-pointer",
                      values.size.size_value_id === value.id &&
                        values.size.size_id === size.size_id &&
                        "bg-slate-400",
                    ])}
                    onClick={() => {
                      setFieldValue("size", {
                        size_id: size.size_id,
                        size_value_id: value.id,
                      });
                    }}
                  >
                    {value.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
