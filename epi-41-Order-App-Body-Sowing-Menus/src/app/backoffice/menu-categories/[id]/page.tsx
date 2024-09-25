import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteMenuCategory, updatingMenuCategory } from "../action";
import { getCurrentLocationId } from "@/libs/action";
import UpdatingMenuCategoryPage from "./UpdatingMenuCategoryPage";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingMenuCategories({ params }: Props) {
  const id = Number(params.id);

  const menuCategoryToBeUpdate = await prisma.menusCategories.findFirst({
    where: { id: id },
    include: { disableMenuCategoriesAndLocations: true },
  });

  const currentLocationId = await getCurrentLocationId();
  const isCurrentNotAvailableMenuCategory =
    menuCategoryToBeUpdate?.disableMenuCategoriesAndLocations.find(
      (item) =>
        item.menuCategoryId === menuCategoryToBeUpdate.id &&
        item.locationId === currentLocationId
    );

  return (
    <UpdatingMenuCategoryPage
      menuCategoryToBeUpdate={menuCategoryToBeUpdate}
      isCurrentNotAvailableMenuCategory={isCurrentNotAvailableMenuCategory}
      id={id}
    />
  );
}
