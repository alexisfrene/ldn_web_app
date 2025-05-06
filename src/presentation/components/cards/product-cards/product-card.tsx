import { AlertModal, Icons, TokenImage } from '@components';

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
    <div className="relative max-w-xs overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <AlertModal
        trigger={
          <Icons
            type="close"
            height={20}
            className="absolute top-0 right-0 m-0.5 cursor-pointer rounded-lg bg-red-500 hover:bg-red-400"
          />
        }
        title="Estas por eliminar una colección de categorías"
        description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
        onConfirm={removeProduct}
      />
      <div className="px-4 py-2">
        <h1 className="flex justify-between text-xl font-bold text-gray-800 uppercase dark:text-white">
          <p className={`${product.state ? 'text-green-500' : 'text-red-600'}`}>
            {`${product.name}(${product.state ? 'D' : 'A'})`}{' '}
          </p>
        </h1>
      </div>
      <div onClick={handleClick}>
        <TokenImage
          url={`${product.primary_image?.toString()}?width=450&height=450&quality=20&format=webp`}
          variant="default"
          className="mt-2 h-48 w-full object-cover"
        />
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
          <h1 className="text-lg font-bold text-white">${product.price}</h1>
          <button className="transform rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
            {product.size === 'Sin talla/numero' ? 'N/A' : product.size}
          </button>
        </div>
      </div>
    </div>
  );
};
