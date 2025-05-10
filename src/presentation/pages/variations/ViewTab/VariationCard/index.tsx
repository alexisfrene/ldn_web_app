import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { TokenImage } from "@common/ImagePrivate";

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
        <TokenImage
          url={`${variation.values[0].images[0]}?width=450&height=450&quality=70&format=webp`}
          variant="default"
        />
      </CardContent>
    </Card>
  );
};
