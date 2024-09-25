"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { AddonCategories } from "@prisma/client";
import { addingAddon } from "../action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  addonCategories: AddonCategories[] | null;
}
export default function AddingAddonPage({ addonCategories }: Props) {
  const router = useRouter();

  const handleAddingAddon = async (formData: FormData) => {
    const response = await addingAddon(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Addon is created successfully");
      router.push("/backoffice/addons");
    }
  };

  return (
    <Box
      component={"form"}
      action={handleAddingAddon}
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
        <span>မင်းမေလိုးလိုက်</span>
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
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
          {addonCategories?.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="addonCategoryId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked name="isAvailable" />}
            label="Is Available"
            sx={{ color: "#023047" }}
          />
        </Box>
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
          Add Addon
        </Button>
      </Box>
    </Box>
  );
}
