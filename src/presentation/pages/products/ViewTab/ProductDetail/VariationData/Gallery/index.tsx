import { TokenImage } from '@components';
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
                <TokenImage
                  url={`${image}?width=60&height=60&quality=50&format=webp`}
                  variant="default"
                  key={imageIndex}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
