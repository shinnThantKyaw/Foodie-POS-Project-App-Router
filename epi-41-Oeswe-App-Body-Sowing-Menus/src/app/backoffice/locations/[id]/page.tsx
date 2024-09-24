import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { deleteLocation, updatingLocation } from "../action";
import { getCurrentLocationId, getLocationsByCompanyId } from "@/libs/action";
import UpdatingLocationPage from "./UpdatingLocationPage";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingLocation({ params }: Props) {
  const id = Number(params.id);
  const currentLocationId = await getCurrentLocationId();
  const locationToBeUpdatedOrDeleted = await prisma.locations.findFirst({
    where: { id },
  });

  if (!locationToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <UpdatingLocationPage
      locationToBeUpdatedOrDeleted={locationToBeUpdatedOrDeleted}
      id={id}
      currentLocationId={currentLocationId}
    />
  );
}
