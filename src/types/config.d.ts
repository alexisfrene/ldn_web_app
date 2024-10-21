type CategoryConfigItem = {
  id: UUID;
  name: string;
  icon: string | null;
};

interface CategoryConfigResponse {
  categories: CategoryConfigItem[];
}
