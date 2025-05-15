import { Button } from "@ui/button";
import { TokenImage } from "@components/common2/image-private";

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
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div onClick={onCLickImage}>
        <TokenImage
          url={`${variation.values[0].images[0]}?width=250&height=150&quality=70&format=webp`}
          variant="default"
          className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 relative">
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="absolute top-1 right-1 hover:bg-red-600 h-6 w-6 rounded-lg"
        >
          X
        </Button>
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          {variation.title}
        </h3>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            Colecciones : {variation.values.length}
          </span>
        </div>
      </div>
    </div>
  );
};
