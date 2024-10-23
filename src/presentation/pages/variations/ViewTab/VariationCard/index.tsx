import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ImageLoader,
} from '@components';

interface Props {
  variation: Variants;
  handleDelete: () => void;
  onCLickImage: () => void;
}

export const VariationCard: React.FC<Props> = ({
  variation,
  handleDelete,
  onCLickImage,
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex justify-between lg:text-sm">
          {variation.title}
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="lg:h-6 lg:w-6 lg:text-xs 2xl:h-8 2xl:text-base"
          >
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center" onClick={onCLickImage}>
        <ImageLoader
          url={variation.values[0].images[0]}
          className={`h-[230px] w-[230px] cursor-pointer rounded-sm sm:rounded-md ${
            false && 'border-2 border-dashed border-amber-900'
          }`}
          alt={variation.title}
          height={'[230px]'}
          width={'[230px]'}
        />
      </CardContent>
    </Card>
  );
};
