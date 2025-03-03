import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  TokenImage,
} from '@components';

interface Props {
  product: Product;
  handleClick: () => void;
  removeProduct: () => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  handleClick,
  removeProduct,
}) => {
  return (
    <Card className="col-span-1 text-[10px] lg:text-xs xl:text-base">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="h-3 truncate lg:h-6">
          <p className={`${product.state ? 'text-green-500' : 'text-red-600'}`}>
            {`${product.name}(${product.state ? 'D' : 'A'})`}
          </p>
        </CardTitle>
        <Button
          variant="destructive"
          onClick={removeProduct}
          className="h-4 w-4 text-[10px] lg:ml-3 lg:h-6 lg:w-6 lg:text-xs 2xl:h-8 2xl:text-base"
        >
          X
        </Button>
      </CardHeader>
      <CardContent onClick={handleClick} className="cursor-pointer">
        <div className="flex justify-center">
          <TokenImage
            url={`${product.primary_image?.toString()}?width=450&height=450&quality=70&format=webp`}
            variant="default"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between lg:mt-1 2xl:mt-3">
        <p>{product.size === 'Sin talla/numero' ? 'N/A' : product.size}</p>
        <p>$ {product.price}</p>
      </CardFooter>
    </Card>
  );
};
