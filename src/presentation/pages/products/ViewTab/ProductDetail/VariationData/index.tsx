import React from 'react';
// import { Gallery } from './Gallery';
import { AddVariations } from './AddVariations';
import { ImageLoader } from '@components';

interface ImagesVariantsProps {
  variation: Product['variation'];
  product_id: Product['product_id'];
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
                  <ImageLoader
                    key={`images-variations-${index}`}
                    url={image}
                    alt={value.label}
                    height={36}
                    width={36}
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
