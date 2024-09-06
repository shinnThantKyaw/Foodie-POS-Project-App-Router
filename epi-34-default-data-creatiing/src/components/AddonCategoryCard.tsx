import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import { AddonCategories, Menus, MenusCategories } from "@prisma/client";
import ClassIcon from "@mui/icons-material/Class";

interface Props {
  addonCategory: AddonCategories;
}

export default function AddonCategoryCard({ addonCategory }: Props) {
  const { name } = addonCategory;
  console.log("menuid is", addonCategory.id);
  return (
    <Link
      href={`/backoffice/addon-categories/${addonCategory.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mr: "8px",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#8ecae6",
            color: "#023047",
            width: "170px",
            height: "170px",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ClassIcon fontSize="large" />
          <h3
            style={{
              padding: "0",
              margin: "0",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {addonCategory.name}
          </h3>
        </Box>
      </Box>
    </Link>
  );
}
