import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import AddonsPage from "./Addons";
import { Dispatch, SetStateAction } from "react";

interface Props {
  addonCategoriesByMenu: AddonCategories[];
  addonsByMenu: Addons[];
  selectedAddons: Addons[];
  setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}
export default function AddonCategoriesAndAddons({
  addonCategoriesByMenu,
  addonsByMenu,
  selectedAddons,
  setSelectedAddons,
}: Props) {
  return (
    <Box sx={{ width: "15vw" }}>
      {addonCategoriesByMenu.map((addonCategoryByMenu) => {
        const addonsByAddonCategory = addonsByMenu.filter(
          (item) => item.addonCategoryId === addonCategoryByMenu.id
        );

        return (
          <Box
            sx={{
              mb: 3,
              border: "1px,solid,lightgray",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{addonCategoryByMenu.name}</Typography>
              <Chip
                label={addonCategoryByMenu.isRequired ? "Required" : "Optional"}
              />
            </Box>
            <AddonsPage
              addonsByAddonCategory={addonsByAddonCategory}
              addonCategoryByMenu={addonCategoryByMenu}
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
            />
          </Box>
        );
      })}
    </Box>
  );
}
