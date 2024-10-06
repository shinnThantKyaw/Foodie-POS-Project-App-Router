"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {
  DisableMenuCategoriesAndLocations,
  MenusCategories,
} from "@prisma/client";
import { updatingAddonCategory } from "../../addon-categories/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteMenuCategory, updatingMenuCategory } from "../action";

interface Props {
  menuCategoryToBeUpdate: MenusCategories | null;
  isCurrentNotAvailableMenuCategory:
    | DisableMenuCategoriesAndLocations
    | undefined;
  id: number;
}
export default function UpdatingMenuCategoryPage({
  menuCategoryToBeUpdate,
  isCurrentNotAvailableMenuCategory,
  id,
}: Props) {
  const router = useRouter();

  const handleUpdatingMenuCategory = async (formData: FormData) => {
    const response = await updatingMenuCategory(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu Catdgory is updated successfully");
      router.push("/backoffice/menu-categories");
    }
  };

  const handleDeleteMenuCategory = async (formData: FormData) => {
    const response = await deleteMenuCategory(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu Category is deleted ");
      router.push("/backoffice/menu-categories");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#8ecae6",
          width: "300px",
          height: "300px",
          borderRadius: "10px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"form"}
          action={handleUpdatingMenuCategory}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={menuCategoryToBeUpdate?.name}
              name="updatedMenuCategoryName"
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    isCurrentNotAvailableMenuCategory ? false : true
                  }
                  name="isAvailable"
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" value={id} name="menuCategoryId" />
          <input
            type="hidden"
            value={isCurrentNotAvailableMenuCategory?.id}
            name="isCurrentNotAvailableMenuCategory"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#023047",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              mt: "10px",
            }}
          >
            Update
          </Button>
        </Box>
        <Box
          component={"form"}
          action={handleDeleteMenuCategory}
          sx={{ mt: 2 }}
        >
          <input type="hidden" value={id} name="menuCategoryId" />
          <Button type="submit" variant="contained" color="error">
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
