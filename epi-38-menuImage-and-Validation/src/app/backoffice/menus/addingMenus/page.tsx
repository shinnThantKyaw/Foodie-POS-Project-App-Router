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
import { getMenuCategoriesByCompanyId } from "@/libs/action";
import AddingMenuPage from "@/app/backoffice/menus/addingMenus/AddingMenuPage";
import { MenusCategories } from "@prisma/client";

export default async function AddingMenus() {
  const menuCategories: MenusCategories[] =
    await getMenuCategoriesByCompanyId();

  return <AddingMenuPage menuCategories={menuCategories} />;
}
