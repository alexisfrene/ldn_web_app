import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@components';
import { axiosInstance } from '@utils';
export const TokenImage: React.FC<{
  url: string;
  variant: 'default' | 'avatar';
}> = ({ url, variant }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const res = await axiosInstance.get(url, { responseType: 'blob' });
        const blobUrl = URL.createObjectURL(res.data);

        if (isMounted) setImageSrc(blobUrl);
      } catch (error) {
        console.error('Error cargando imagen:', error);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [url]);

  if (variant === 'avatar') {
    return (
      <Avatar>
        <AvatarImage src={imageSrc ?? ''} alt="Avatar" />
      </Avatar>
    );
  }

  return <img src={imageSrc ?? ''} alt="Imagen" />;
};
