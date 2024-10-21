import { ImageLoader } from '@components';
import { getVariationById } from '@services';
import React, { useEffect, useState } from 'react';
interface GalleryImagesVariantsProps {
  ImageVariantsId: string | null;
}

export const Gallery: React.FC<GalleryImagesVariantsProps> = ({
  ImageVariantsId,
}) => {
  const [imageVariants, setImageVariants] = useState<Variants | null>(null);

  const handleFetchImages = async () => {
    if (ImageVariantsId) {
      const imageSelected = await getVariationById(ImageVariantsId);
      setImageVariants(imageSelected);
    }
  };

  useEffect(() => {
    handleFetchImages();
  }, []);

  return (
    <div>
      {imageVariants && (
        <div>
          <h3>{imageVariants.title}</h3>
          {imageVariants.values.map((value) => (
            <div key={value.id} className="grid grid-cols-3 gap-5">
              {value.images.map((image, imageIndex) => (
                <ImageLoader
                  key={`${imageIndex}-collection-images`}
                  url={image}
                  alt={value.label}
                  className="col-span-1 h-28 w-28 transform rounded object-cover shadow-md transition-all duration-300 hover:scale-105"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
