"use client";

import { Box, Button } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import AddonCategoriesAndAddons from "./AddonCategoriesAndAddons";
import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";

interface Props {
  addonCategoriesByMenu: AddonCategories[];
  addonsByMenu: Addons[];
}
export default function MenuDetailsPageBody({
  addonCategoriesByMenu,
  addonsByMenu,
}: Props) {
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
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
      >
        Add To Chart
      </Button>
    </Box>
  );
}
