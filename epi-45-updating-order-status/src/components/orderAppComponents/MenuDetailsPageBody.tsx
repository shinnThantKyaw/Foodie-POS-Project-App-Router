"use client";

import { Box, Button } from "@mui/material";
import { AddonCategories, Addons, Orders, Prisma } from "@prisma/client";
import AddonCategoriesAndAddons from "./AddonCategoriesAndAddons";
import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { createCartOrder, updateTheOrderInCart } from "@/app/order/cart/action";
import { it } from "node:test";

export type OrderWithOrdersAndAddon = Prisma.OrdersGetPayload<{
  include: { ordersAndAddons: true };
}>;

interface Props {
  addonCategoriesByMenu: AddonCategories[];
  addonsByMenu: Addons[];
  tableId: number;
  menuId: number;
  orderToBeUpdate: OrderWithOrdersAndAddon | null;
}
export default function MenuDetailsPageBody({
  addonCategoriesByMenu,
  addonsByMenu,
  tableId,
  menuId,
  orderToBeUpdate,
}: Props) {
  // set selected addons while updatig menus
  let selectedAddonsInOrder: Addons[] = [];
  if (orderToBeUpdate) {
    const selectedAddonIdsInOrder = orderToBeUpdate.ordersAndAddons.map(
      (item) => item.addonId
    );
    selectedAddonsInOrder = addonsByMenu.filter((addon) =>
      selectedAddonIdsInOrder.includes(addon.id)
    );
  }

  const [selectedAddons, setSelectedAddons] = useState<Addons[]>(
    selectedAddonsInOrder.length ? selectedAddonsInOrder : []
  );
  const [quantity, setQuantity] = useState<number>(
    orderToBeUpdate ? orderToBeUpdate.quantity : 1
  );
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    handleIsDisable();
  }, [selectedAddons, addonCategoriesByMenu]);

  const handleIsDisable = () => {
    const requiredAddonCategoriesByMenu = addonCategoriesByMenu.filter(
      (item) => item.isRequired
    );

    const selectedAddonCategoryIds = selectedAddons.map(
      (item) => item.addonCategoryId
    );

    const selectedAddonCategories = addonCategoriesByMenu.filter((item) =>
      selectedAddonCategoryIds.includes(item.id)
    );

    const requiredSelectedAddonCategories = selectedAddonCategories.filter(
      (item) => item.isRequired
    );

    const isDisable =
      requiredAddonCategoriesByMenu.length !==
      requiredSelectedAddonCategories.length;

    setIsDisable(isDisable);
  };

  const handleCreateCartOrder = async () => {
    await createCartOrder({
      tableId,
      menuId,
      quantity,

      addonIds: selectedAddons.map((addon) => addon.id),
    });
  };

  const handleUpdateTheOrderInCart = async () => {
    await updateTheOrderInCart({
      tableId,
      menuId,
      quantity,

      addonIds: selectedAddons.map((addon) => addon.id),
      orderId: orderToBeUpdate?.id,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        top: -80,
      }}
    >
      <AddonCategoriesAndAddons
        addonCategoriesByMenu={addonCategoriesByMenu}
        addonsByMenu={addonsByMenu}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        sx={{ mt: 2, bgcolor: "#219ebc", ":hover": { bgcolor: "#4eb9d4" } }}
        variant="contained"
        disabled={isDisable}
        onClick={
          orderToBeUpdate ? handleUpdateTheOrderInCart : handleCreateCartOrder
        }
      >
        {orderToBeUpdate ? "Update The Order" : "Add To Chart"}
      </Button>
    </Box>
  );
}
