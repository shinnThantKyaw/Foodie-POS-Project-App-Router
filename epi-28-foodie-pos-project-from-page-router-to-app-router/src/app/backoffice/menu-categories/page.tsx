"use client";

import config from "@/config";
import { Box, Button, Link } from "@mui/material";
import { MenusCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenusCategoriesPage() {
  useEffect(() => {
    getTheMenuCategories();
  }, []);
  const router = useRouter();

  const [menuCategories, setMenuCategories] = useState<MenusCategories[]>([]);
  const getTheMenuCategories = async () => {
    console.log("get the menus");

    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromSever = await response.json();
    const menuCategories: MenusCategories[] = JSON.parse(dataFromSever);
    console.log("menu categories is", menuCategories);
    setMenuCategories(menuCategories);
  };

  if (menuCategories.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            paddingTop: "0px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              router.push("/backoffice/menu-categories/addingMenuCategories");
            }}
          >
            Create New MenuCategory
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            mt: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#fb8500",
              color: "#023047",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no menu category yet
          </h1>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/menu-categories/addingMenuCategories");
          }}
        >
          Create New Menu Category
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mt: "20px",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {menuCategories.map((menuCategory) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: "8px",
                mt: "10px",
              }}
              key={menuCategory.id}
            >
              <Box
                sx={{
                  backgroundColor: "#fb8500",
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
                <h3 style={{ padding: "0", margin: "0", textAlign: "center" }}>
                  {menuCategory.name}
                </h3>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
