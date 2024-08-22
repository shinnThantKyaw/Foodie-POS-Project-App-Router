"use client";

import config from "@/config";
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
import { useState } from "react";

export default function addingMenuCategories() {
  const defaultMenuCategory: Partial<MenusCategories> = {
    name: "",
  };

  const router = useRouter();
  const [menuCategory, setMenuCategory] =
    useState<Partial<MenusCategories>>(defaultMenuCategory);
  const handleAddingMenuCategory = async () => {
    await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      method: "POST",
      body: JSON.stringify(menuCategory),
    });
    router.push("/backoffice/menu-categories");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#219ebc",
          width: "400px",
          height: "400px",
          borderRadius: "10px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            value={menuCategory.name}
            onChange={(e) => {
              setMenuCategory({ ...menuCategory, name: e.target.value });
            }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#023047",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            mt: "10px",
          }}
          onClick={handleAddingMenuCategory}
        >
          Add Menu Category
        </Button>
      </Box>
    </Box>
  );
}
