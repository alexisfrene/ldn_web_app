import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllSizes } from '@services';
import { LoadingIndicator } from '@components';
import { NotSizes } from '@presentation/components/empty-states';
import { ViewSizes } from './ViewSizes';

interface SizeEditProps {
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const SizeEdit: React.FC<SizeEditProps> = ({ showSheet }) => {
  const { isPending, error, data } = useQuery<Size[]>({
    queryKey: ['sizes'],
    queryFn: getAllSizes,
  });

  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex min-w-[70vw] flex-col">
      {data.length === 0 ? (
        <NotSizes showSheet={showSheet} />
      ) : (
        <ViewSizes showSheet={showSheet} data={data} />
      )}
    </div>
  );
};
