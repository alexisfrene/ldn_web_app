import React from "react";
import { TokenImage } from "@common/ImagePrivate";
import { AddVariations } from "./AddVariations";

interface ImagesVariantsProps {
  variation: Product["variation"];
  product_id: Product["product_id"];
}

export const VariationData: React.FC<ImagesVariantsProps> = ({
  variation,
  product_id,
}) => {
  return (
    <div>
      {variation?.variation_id ? (
        <div>
          {variation.values.map((value) => {
            return (
              <div className="grid grid-cols-4 gap-3" key={value.id}>
                <p className="col-span-4">{value.label}</p>
                {value.images.map((image, index) => (
                  <TokenImage
                    key={index}
                    url={`${image}?width=450&height=450&quality=70&format=webp`}
                    variant="default"
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <AddVariations product_id={product_id} />
      )}
    </div>
  );
};
