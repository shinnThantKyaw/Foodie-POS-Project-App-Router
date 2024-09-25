import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { addingAddon } from "../action";
import { getAddonCategoriesByCompanyId } from "@/libs/action";
import AddingAddonPage from "./AddingAddonPage";

export default async function AddingAddons() {
  const addonCategories = await getAddonCategoriesByCompanyId();

  return <AddingAddonPage addonCategories={addonCategories} />;
}
