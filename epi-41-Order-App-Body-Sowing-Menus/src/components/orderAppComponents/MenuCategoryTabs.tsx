"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MenusCategories } from "@prisma/client";

interface Props {
  menuCategories: MenusCategories[];
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<number>>;
}
export default function MenuCategoryTabs({
  menuCategories,
  setSelectedMenuCategoryId,
}: Props) {
  const [value, setValue] = React.useState(menuCategories[0].name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: -75,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#219ebc", // Customize the indicator color
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#219ebc", // Customize the selected tab color
          },
        }}
      >
        {menuCategories.map((menuCategory) => {
          return (
            <Tab
              key={menuCategory.id}
              value={menuCategory.name}
              label={menuCategory.name}
              onClick={() => setSelectedMenuCategoryId(menuCategory.id)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
