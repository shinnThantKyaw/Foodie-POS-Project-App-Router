import MultipleSelect from "@/components/multipleSelect";
import config from "@/config";
import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Menus, MenusCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addingTable } from "../action";
import {
  getLocationsByCompanyId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import { getLocationOrigin } from "next/dist/shared/lib/utils";

export default async function AddingMenus() {
  const locations = await getLocationsByCompanyId();

  return (
    <Box
      component={"form"}
      action={addingTable}
      sx={{
        paddingRight: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            px: 1.5,
            py: 1,
            borderRadius: "5px",
          }}
        >
          {locations.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="locationId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#023047",
            color: "#8ecae6",
            ":hover": { bgcolor: "#219ebc", color: "#023047" },
            mt: "10px",
          }}
        >
          Add Table
        </Button>
      </Box>
    </Box>
  );
}
