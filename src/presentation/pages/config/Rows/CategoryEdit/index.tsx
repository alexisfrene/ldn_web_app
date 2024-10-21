import React, { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@services';
import { LoadingIndicator } from '@components';
import { NotCategories } from './ViewCategories/NotCategories';
import { ViewCategories } from './ViewCategories';

interface CategoryEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}

export const CategoryEdit: React.FC<CategoryEditProps> = ({ showSheet }) => {
  const { isPending, error, data } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex min-w-[70vw] flex-col">
      {data.length === 0 ? (
        <NotCategories showSheet={showSheet} />
      ) : (
        <ViewCategories showSheet={showSheet} data={data} />
      )}
    </div>
  );
};
