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
import { deleteAddon, updatingAddon } from "../action";
import { getAddonCategoriesByCompanyId } from "@/libs/action";
import UpdatingAddonPage from "./UpdatingAddon";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingAddon({ params }: Props) {
  const id = Number(params.id);

  const addonCategories = await getAddonCategoriesByCompanyId();

  const addonToBeUpdatedOrDeleted = await prisma.addons.findFirst({
    where: { id: id },
  });

  if (!addonToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <UpdatingAddonPage
      addonToBeUpdatedOrDeleted={addonToBeUpdatedOrDeleted}
      addonCategories={addonCategories}
      id={id}
    />
  );
}
