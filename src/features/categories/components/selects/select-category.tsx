import React from "react";
import { FormikValues, useFormikContext } from "formik";
import { cn } from "@utils";
import { TokenImage } from "@components/common/image-private";
import { useGetCategories } from "@categories-hooks/use-get-categories";

export const SelectCategory: React.FC = () => {
  const { categories, isLoading } = useGetCategories();
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        categories.map((category) => {
          return (
            <div key={category.category_id} className="my-3">
              {category.title}
              <div className="flex gap-3">
                {category.values.map((value) => {
                  return (
                    <div
                      key={value.id}
                      className={cn([
                        "flex items-center gap-3 bg-slate-700 rounded-xl pr-3 hover:bg-slate-800 cursor-pointer",
                        values.category.category_value_id === value.id &&
                          values.category.category_id ===
                            category.category_id &&
                          "bg-slate-400",
                      ])}
                      onClick={() => {
                        setFieldValue("category", {
                          category_id: category.category_id,
                          category_value_id: value.id,
                        });
                      }}
                    >
                      <TokenImage
                        url={`${value.icon_url?.toString()}?width=50&height=50&quality=10&format=webp`}
                        variant="avatar"
                      />
                      {value.value}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
