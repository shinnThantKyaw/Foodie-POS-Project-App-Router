"use client";

import { getMenusByMenuCategoryId } from "@/app/order/action";
import { prisma } from "@/libs/prisma";
import { Box } from "@mui/material";
import { Menus } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  selectedMenuCategoryId: number;
  tableId: number;
}
export default function OrderAppMenus({
  selectedMenuCategoryId,
  tableId,
}: Props) {
  const [menus, setMenus] = useState<Menus[]>([]);

  useEffect(() => {
    handleGetMenusByMenuCategoryId();
  }, [selectedMenuCategoryId]);

  const handleGetMenusByMenuCategoryId = async () => {
    const menus = await getMenusByMenuCategoryId(
      selectedMenuCategoryId,
      tableId
    );
    setMenus(menus);
    console.log("data is", menus);
  };
  return <Box>OrderApp Menus</Box>;
}
