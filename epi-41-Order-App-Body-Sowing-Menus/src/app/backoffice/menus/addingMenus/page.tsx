import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  MenuListClassKey,
  TextField,
} from "@mui/material";
import { addingMenu } from "../action";
import {
  getAddonCategoriesByCompanyId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import AddingMenuPage from "@/app/backoffice/menus/addingMenus/AddingMenuPage";
import { AddonCategories, MenusCategories } from "@prisma/client";

export default async function AddingMenus() {
  const menuCategories: MenusCategories[] =
    await getMenuCategoriesByCompanyId();

  const addonCategories: AddonCategories[] =
    await getAddonCategoriesByCompanyId();

  return (
    <AddingMenuPage
      menuCategories={menuCategories}
      addonCategories={addonCategories}
    />
  );
}
