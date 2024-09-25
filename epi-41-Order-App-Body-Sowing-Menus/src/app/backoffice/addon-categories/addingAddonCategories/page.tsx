import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { addingAddonCategory } from "../action";
import { getMenusByCompanyId } from "@/libs/action";
import toast from "react-hot-toast";
import AddingAddonCategoryPage from "./AddingAddonCategoryPage";

export default async function addinAddonCategoryPage() {
  const menus = await getMenusByCompanyId();

  return <AddingAddonCategoryPage menus={menus} />;
}
