"use client";

import { getMenusByMenuCategoryId } from "@/app/order/action";
import { prisma } from "@/libs/prisma";
import { Box } from "@mui/material";
import { Menus } from "@prisma/client";
import { useEffect, useState } from "react";
import MenuCardOrderApp from "./MenuCardOrderApp";

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
  };

  if (menus.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "80vw",
        }}
      >
        <h3 style={{ color: "#219ebc" }}>
          {" "}
          There is no menus in this Menu Category!
        </h3>
      </Box>
    );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "80vw",
      }}
    >
      {menus.map((menu) => {
        return <MenuCardOrderApp menu={menu} tableId={tableId} />;
      })}
    </Box>
  );
}
