"use client";

import { Box } from "@mui/material";
import { MenusCategories } from "@prisma/client";
import MenuCategoryTabs from "./MenuCategoryTabs";
import OrderAppMenus from "./OrderAppMenus";
import { useState } from "react";

interface Props {
  menuCategories: MenusCategories[];
  tableId: number;
}
export default function OrderAppBody({ menuCategories, tableId }: Props) {
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState<number>(
    menuCategories[0].id
  );
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MenuCategoryTabs
        menuCategories={menuCategories}
        setSelectedMenuCategoryId={setSelectedMenuCategoryId}
      />
      <OrderAppMenus
        selectedMenuCategoryId={selectedMenuCategoryId}
        tableId={tableId}
      />
    </Box>
  );
}
