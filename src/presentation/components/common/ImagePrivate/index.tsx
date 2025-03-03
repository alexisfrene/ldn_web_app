import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarImage } from '@components';
import { axiosInstance } from '@utils';

export const TokenImage: React.FC<{
  url: string;
  variant: 'default' | 'avatar';
}> = ({ url, variant }) => {
  const { data: imageSrc, error } = useQuery({
    queryKey: ['image', url],
    queryFn: async () => {
      const res = await axiosInstance.get(url, { responseType: 'blob' });
      return URL.createObjectURL(res.data);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (error) console.error('Error cargando imagen:', error);

  if (variant === 'avatar') {
    return (
      <Avatar>
        <AvatarImage src={imageSrc ?? ''} alt="Avatar" />
      </Avatar>
    );
  }

  return <img src={imageSrc ?? ''} alt="Imagen" />;
};
