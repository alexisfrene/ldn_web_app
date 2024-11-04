import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn, fetchImage } from '@utils';
import { Skeleton } from '@presentation/components/ui';

export const ImageLoader: React.FC<Props> = ({
  url,
  width = 60,
  height = 60,
  className,
  alt,
  ...props
}) => {
  const {
    data: imageSrc,
    error,
    isLoading,
  } = useQuery({ queryKey: ['image', url], queryFn: () => fetchImage(url) });

  if (error) return <div>Error loading image</div>;
  const styles = cn(
    `col-span-1 ${
      isLoading ? 'hidden' : 'block'
    } object-fill h-${height} w-${width} ${className}`,
  );

  return isLoading ? (
    <Skeleton className={cn(`h-${height} w-${width} col-span-1`)} />
  ) : (
    <img src={imageSrc as string} className={styles} alt={alt} {...props} />
  );
};
