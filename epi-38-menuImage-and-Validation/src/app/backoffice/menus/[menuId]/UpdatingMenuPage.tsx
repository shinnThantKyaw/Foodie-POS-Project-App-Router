"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import {
  DisableMenusAndLocations,
  Menus,
  MenusCategories,
} from "@prisma/client";
import { deleteMenu, updatingMenu } from "../action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  menuId: number;
  menuToBeUpdatedOrDeleted: Menus;
  menuCategories: MenusCategories[];
  selectedMenuCategoryIds: number[] | undefined;
  isCurrentNotAvailableMenu: DisableMenusAndLocations | undefined;
}

export default function UpdatingMenuPage({
  menuId,
  menuToBeUpdatedOrDeleted,
  menuCategories,
  selectedMenuCategoryIds,
  isCurrentNotAvailableMenu,
}: Props) {
  const router = useRouter();

  const handleUpdatingMenu = async (formData: FormData) => {
    const response = await updatingMenu(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu  is updated successfully");
      router.push("/backoffice/menus");
    }
  };

  const handleDeleteMenu = async (formData: FormData) => {
    const response = await deleteMenu(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu  is deleted ");
      router.push("/backoffice/menus");
    }
  };

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={handleDeleteMenu}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2.5,
          paddingRight: 3,
        }}
      >
        {" "}
        <h2>Updating Menu</h2>
        <input type="hidden" name="menuId" value={menuId} />
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: "7px" }}
        >
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={handleUpdatingMenu}
        sx={{
          paddingRight: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              name="name"
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={menuToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              my: "20px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <TextField
              name="price"
              id="outlined-basic"
              variant="outlined"
              placeholder="Price"
              type="number"
              sx={{ width: "100%" }}
              defaultValue={
                menuToBeUpdatedOrDeleted.price === 0
                  ? ""
                  : menuToBeUpdatedOrDeleted.price
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              px: 1.5,
              py: 1,
              borderRadius: "5px",
            }}
          >
            {menuCategories.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      selectedMenuCategoryIds?.includes(item.id) ? true : false
                    }
                    name="menuCategoryId"
                    value={item.id}
                  />
                }
                label={item.name}
                sx={{ color: "#023047" }}
              />
            ))}
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={isCurrentNotAvailableMenu ? false : true}
                  name="isAvailable"
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>
          <input type="hidden" name="menuId" value={menuId} />
          <input
            type="hidden"
            name="isCurrentNotAvailableMenu"
            value={isCurrentNotAvailableMenu?.id}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#219ebc", color: "#023047" },
              mt: "10px",
            }}
          >
            Update Menu
          </Button>
        </Box>
      </Box>
    </>
  );
}
