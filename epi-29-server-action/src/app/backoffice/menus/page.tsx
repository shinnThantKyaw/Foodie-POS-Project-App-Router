"use client";

import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";
import { Box, Button } from "@mui/material";
import next from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menus } from "@prisma/client";
import config from "@/config";
import { useRouter } from "next/navigation";
import MenuCard from "@/components/MenuCard";

export default function MenusPage() {
  useEffect(() => {
    getTheMenus();
  }, []);
  const router = useRouter();

  const [menus, setMenus] = useState<Menus[]>([]);
  const getTheMenus = async () => {
    console.log("get the menus");

    const response = await fetch(`${config.backofficeApiUrl}/menus`);
    const dataFromSever = await response.json();
    const menus: Menus[] = JSON.parse(dataFromSever);
    console.log("menus is", menus);
    setMenus(menus);
  };

  if (!menus) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (menus.length === 0) {
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
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
            variant="contained"
            onClick={() => {
              router.push("/backoffice/menus/addingMenus");
            }}
          >
            Create New
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
              backgroundColor: "#8ecae6",
              color: "#023047",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no menu yet
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
          sx={{
            bgcolor: "#023047",
            color: "#8ecae6",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
          }}
          onClick={() => {
            router.push("/backoffice/menus/addingMenus");
          }}
        >
          Create New
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
        {menus.map((menu) => {
          return <MenuCard menu={menu} />;
        })}
      </Box>
    </>
  );
}
