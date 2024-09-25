"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddonCategory, updatingAddonCategory } from "../action";
import { AddonCategories, Menus } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  addonCategoryToBeUpdate: AddonCategories | null;
  menus: Menus[];
  selectedMenuIds: number[] | undefined;
  id: number;
}
export default function UpdatingAddonCategoriesPage({
  addonCategoryToBeUpdate,
  menus,
  selectedMenuIds,
  id,
}: Props) {
  const router = useRouter();

  const handleUpdatingAddonCategory = async (formData: FormData) => {
    const response = await updatingAddonCategory(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("AddonCategory is updated successfully");
      router.push("/backoffice/addon-categories");
    }
  };

  const handleDeleteAddonCategory = async (formData: FormData) => {
    const response = await deleteAddonCategory(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.error("AddonCategory is deleted ");
      router.push("/backoffice/addon-categories");
    }
  };
  return (
    <Box
      sx={{
        paddingRight: 2,
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
        <Box
          component={"form"}
          action={handleUpdatingAddonCategory}
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={addonCategoryToBeUpdate?.name}
              name="name"
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Menus{" "}
          </Typography>

          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              width: "100%",

              px: 1.5,
              py: 1,
              mb: 1,
              borderRadius: "5px",
            }}
          >
            {menus.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      selectedMenuIds?.includes(item.id) ? true : false
                    }
                    name="menuId"
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
                  defaultChecked={
                    addonCategoryToBeUpdate?.isRequired ? true : false
                  }
                  name="isRequired"
                />
              }
              label="Is Required"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" value={id} name="addonCategoryId" />

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "fit-content",
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
          action={handleDeleteAddonCategory}
          sx={{ mt: 2 }}
        >
          <input type="hidden" value={id} name="addonCategoryId" />
          <Button type="submit" variant="contained" color="error">
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
