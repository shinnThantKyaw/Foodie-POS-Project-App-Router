import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddonCategory, updatingAddonCategory } from "../action";
import { getMenusByCompanyId } from "@/libs/action";
import UpdatingAddonCategoriesPage from "./UpdatingAddonCategories";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingAddonCategories({ params }: Props) {
  const id = Number(params.id);

  const addonCategoryToBeUpdate = await prisma.addonCategories.findFirst({
    where: { id: id },
    include: { addonCategoriesAndMenus: true },
  });
  const selectedMenuIds = addonCategoryToBeUpdate?.addonCategoriesAndMenus.map(
    (item) => item.menuId
  );

  const menus = await getMenusByCompanyId();
  return (
    <UpdatingAddonCategoriesPage
      addonCategoryToBeUpdate={addonCategoryToBeUpdate}
      menus={menus}
      selectedMenuIds={selectedMenuIds}
      id={id}
    />
  );
}
