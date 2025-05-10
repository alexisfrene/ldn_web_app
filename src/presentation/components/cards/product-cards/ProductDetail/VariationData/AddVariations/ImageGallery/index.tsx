import { Card } from "@components";

interface ImageGalleryProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  productSelectedId: string | null;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({}) => {
  return (
    <Card className="mx-20 my-5 h-[92vh]">
      <p></p>
    </Card>
  );
};
