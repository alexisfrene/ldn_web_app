import { useQuery } from "@tanstack/react-query";
import { getVariationById } from "@services";
import { CollectionTab } from "./CollectionTab";
import { GalleryTab } from "./GalleryTab";
import { LoadingIndicator } from "@common/Loading";
import { MenuTabs } from "@common/MenuTabs";
import { ScrollArea } from "@ui/scroll-area";
import { TabsContent } from "@ui/tabs";

const tabs = ["Ver imágenes", "Agregar una colección"];

interface Props {
  variationId: string;
}

export const VariationDetail: React.FC<Props> = ({ variationId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["variation_details", variationId],
    queryFn: () => getVariationById(variationId),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <MenuTabs tabs={tabs} tabStyle="sm:text-sm" containerStyle="p-0">
      {data && (
        <ScrollArea className="h-[50vh]">
          <TabsContent value={tabs[0]}>
            <GalleryTab variation={data} />
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <CollectionTab variationId={data.variation_id} />
          </TabsContent>
        </ScrollArea>
      )}
    </MenuTabs>
  );
};
