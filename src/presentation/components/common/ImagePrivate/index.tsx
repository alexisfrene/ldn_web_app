import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@components';
import { axiosInstance, cn } from '@utils';

interface TokenImageProps {
  url?: string;
  variant: 'default' | 'avatar';
  skeletonWidth?: number;
  skeletonHeight?: number;
  className?: string;
}

export const TokenImage: React.FC<TokenImageProps> = ({
  url,
  variant = 'default',
  skeletonWidth = variant === 'avatar' ? 60 : 230,
  skeletonHeight = variant === 'avatar' ? 60 : 230,
  className = '',
}) => {
  const {
    data: imageSrc,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['image', url],
    queryFn: async () => {
      if (!url) throw new Error('URL no proporcionada');
      const res = await axiosInstance.get(url, { responseType: 'blob' });
      return URL.createObjectURL(res.data);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!url,
  });

  if (error) {
    console.error('Error cargando imagen:', error);
    return <img src="/default.png" alt="Imagen" className={className} />;
  }

  if (isLoading) {
    const skeletonClass = variant === 'avatar' ? 'rounded-full' : '';
    return (
      <Skeleton
        className={cn([skeletonClass, className])}
        style={{ width: skeletonWidth, height: skeletonHeight }}
      />
    );
  }

  if (!imageSrc) {
    return <div>No se pudo cargar la imagen</div>;
  }

  if (variant === 'avatar') {
    return (
      <Avatar className={className}>
        <AvatarImage src={imageSrc} alt="Avatar" />
        <AvatarFallback className={className}>CN</AvatarFallback>
      </Avatar>
    );
  }

  return <img src={imageSrc} alt="Imagen" className={className} />;
};
