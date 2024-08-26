"use client";

import MultipleSelect from "@/components/multipleSelect";
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
import { useEffect, useState } from "react";

export default function AddingMenus() {
  const defaultMenu: Partial<Menus> = {
    name: "",
    price: 0,
    isAvailable: true,
  };

  const router = useRouter();
  const [menu, setMenu] = useState<Partial<Menus>>(defaultMenu);
  const [selectedMenuCategoryIds, setSelectedMenuCategoryIds] = useState<
    number[]
  >([]);
  const [menuCategories, setMenuCategories] = useState<MenusCategories[]>([]);

  useEffect(() => {
    getTheMenuCategories();
  }, []);

  const getTheMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromSever = await response.json();
    const menuCategories: MenusCategories[] = JSON.parse(dataFromSever);
    console.log("menu categories is", menuCategories);
    setMenuCategories(menuCategories);
  };

  const handleAddingMenu = async () => {
    if (selectedMenuCategoryIds.length === 0) {
      return alert(" you need to add menu category for this menu");
    }
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "POST",
      body: JSON.stringify({
        ...menu,
        menuCategoryIds: selectedMenuCategoryIds,
      }),
    });
    router.push("/backoffice/menus");
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
          bgcolor: "#8ecae6",
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
            value={menu.name}
            onChange={(e) => {
              setMenu({ ...menu, name: e.target.value });
            }}
          />
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            my: "20px",
            width: "100%",
            borderRadius: "8px",
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Price"
            type="number"
            sx={{ width: "100%" }}
            value={menu.price === 0 ? "" : menu.price}
            onChange={(e) => {
              console.log(e.target.value);
              setMenu({ ...menu, price: Number(e.target.value) });
            }}
          />
        </Box>
        <MultipleSelect
          title={"Menu Categories"}
          selectedMenuCategoryIds={selectedMenuCategoryIds}
          setSelectedMenuCategoryIds={setSelectedMenuCategoryIds}
          items={menuCategories}
        />
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Is Available"
            sx={{ color: "#023047" }}
            value={menu.isAvailable}
            onChange={() => {
              menu.isAvailable = !menu.isAvailable;
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#023047",
            color: "#8ecae6",
            ":hover": { bgcolor: "#219ebc", color: "#023047" },
            mt: "10px",
          }}
          onClick={handleAddingMenu}
        >
          Add Menu
        </Button>
      </Box>
    </Box>
  );
}
