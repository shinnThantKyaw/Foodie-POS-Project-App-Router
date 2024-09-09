"use client";

import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Locations } from "@prisma/client";
import loadCustomRoutes from "next/dist/lib/load-custom-routes";

interface Props {
  id: string;
  locations: Locations[];
}

export default function CurrentLocationCheckBox({ id, locations }: Props) {
  if (!localStorage) return null;
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={id === localStorage.getItem("currentLocationId")}
            name="isAvailable"
          />
        }
        label="CurrentLocation"
        sx={{ color: "#023047" }}
        onChange={(_, checked) => {
          if (checked) {
            localStorage.setItem("currentLocationId", id);
          } else {
            localStorage.setItem("currentLocationId", String(locations[0].id));
          }
        }}
      />
    </Box>
  );
}
