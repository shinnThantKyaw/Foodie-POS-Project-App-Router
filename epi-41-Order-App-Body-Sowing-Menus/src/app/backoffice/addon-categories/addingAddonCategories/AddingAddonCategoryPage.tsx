"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { addingAddonCategory } from "../action";
import { Menus } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  menus: Menus[];
}
export default function AddingAddonCategoryPage({ menus }: Props) {
  const router = useRouter();

  const handleAddingAddonCategory = async (formData: FormData) => {
    const response = await addingAddonCategory(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("AddonCategory is created successfully");
      router.push("/backoffice/addon-categories");
    }
  };

  return (
    <Box
      component={"form"}
      action={handleAddingAddonCategory}
      sx={{
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
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            defaultValue={""}
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
            px: 1.5,
            py: 1,
            mb: 1,
            borderRadius: "5px",
          }}
        >
          {menus.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="menuId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isRequired" />}
            label="Is Required"
            sx={{ color: "#023047" }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#023047",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            mt: "10px",
          }}
          /*           onClick={handleAddingMenuCategory}
           */
        >
          Add Addon Category
        </Button>
      </Box>
    </Box>
  );
}
