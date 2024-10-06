"use client";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  addonsByAddonCategory: Addons[];
  addonCategoryByMenu: AddonCategories;
  selectedAddons: Addons[];
  setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}
export default function AddonsPage({
  addonsByAddonCategory,
  addonCategoryByMenu,
  selectedAddons,
  setSelectedAddons,
}: Props) {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      {addonsByAddonCategory.map((addonByAddonCategory) => {
        return (
          <Box
            key={addonByAddonCategory.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "cent",
            }}
          >
            <FormControlLabel
              label={addonByAddonCategory.name}
              control={
                addonCategoryByMenu.isRequired ? (
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#219ebc",
                      },
                    }}
                    checked={
                      selectedAddons.find(
                        (item) => item.id === addonByAddonCategory.id
                      )
                        ? true
                        : false
                    }
                    onChange={() => {
                      const others = selectedAddons.filter(
                        (selectedAddon) =>
                          !addonsByAddonCategory.includes(selectedAddon)
                      );

                      setSelectedAddons([...others, addonByAddonCategory]);
                    }}
                  />
                ) : (
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#219ebc",
                      },
                    }}
                    checked={
                      selectedAddons.find(
                        (item) => item.id === addonByAddonCategory.id
                      )
                        ? true
                        : false
                    }
                    onChange={(_, value) => {
                      if (value) {
                        setSelectedAddons([
                          ...selectedAddons,
                          addonByAddonCategory,
                        ]);
                      } else {
                        const addons = selectedAddons.filter(
                          (addon) => addon.id !== addonByAddonCategory.id
                        );
                        setSelectedAddons(addons);
                      }
                    }}
                  />
                )
              }
            />
            <Typography>{addonByAddonCategory.price}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
