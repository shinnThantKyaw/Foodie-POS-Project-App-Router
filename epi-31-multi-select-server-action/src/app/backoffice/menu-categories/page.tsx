import MenuCategoryCard from "@/components/MenuCategoryCard";
import { prisma } from "@/libs/prisma";
import { Box, Button, Link } from "@mui/material";
import { MenusCategories } from "@prisma/client";

export default async function MenusCategoriesPage() {
  const menuCategories: MenusCategories[] =
    await prisma.menusCategories.findMany();

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
          <Link href="/backoffice/menu-categories/addingMenuCategories">
            <Button variant="contained">Create New MenuCategory</Button>
          </Link>
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
        <Link href={"/backoffice/menu-categories/addingMenuCategories"}>
          <Button
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
            variant="contained"
          >
            Create New Menu Category
          </Button>
        </Link>
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
            <MenuCategoryCard
              key={menuCategory.id}
              menuCategory={menuCategory}
            />
          );
        })}
      </Box>
    </>
  );
}
