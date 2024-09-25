import { prisma } from "@/libs/prisma";
import { deleteMenu, updatingMenu } from "../action";
import {
  getAddonCategoriesByCompanyId,
  getCurrentLocation,
  getCurrentLocationId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import UpdatingMenuPage from "./UpdatingMenuPage";

interface Props {
  params: {
    menuId: string;
  };
}

export default async function UpdatingMenu({ params }: Props) {
  const menuId = Number(params.menuId);

  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: {
      menusCategoriesAndMenus: true,
      addonCategoriesAndMenus: true,
      disableMenusAndLocations: true,
    },
  });

  const menuCategories = await getMenuCategoriesByCompanyId();
  const addonCategories = await getAddonCategoriesByCompanyId();

  const selectedMenuCategoryIds =
    menuToBeUpdatedOrDeleted?.menusCategoriesAndMenus.map(
      (item) => item.menuCategoryIds
    );

  const selectedAddonCategories =
    menuToBeUpdatedOrDeleted?.addonCategoriesAndMenus.map(
      (item) => item.addonCategoryId
    );

  const currentLocationId = await getCurrentLocationId();
  const isCurrentNotAvailableMenu =
    menuToBeUpdatedOrDeleted?.disableMenusAndLocations.find(
      (item) =>
        item.menuId === menuToBeUpdatedOrDeleted.id &&
        item.locationId === currentLocationId
    );

  if (!menuToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <UpdatingMenuPage
      menuId={menuId}
      menuToBeUpdatedOrDeleted={menuToBeUpdatedOrDeleted}
      menuCategories={menuCategories}
      selectedMenuCategoryIds={selectedMenuCategoryIds}
      addonCategories={addonCategories}
      selectedAddonCategories={selectedAddonCategories}
      isCurrentNotAvailableMenu={isCurrentNotAvailableMenu}
    />
  );
}
