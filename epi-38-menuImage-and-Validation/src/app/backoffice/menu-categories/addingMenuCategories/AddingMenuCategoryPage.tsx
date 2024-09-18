"use client";

import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addingMenuCategory } from "../action";

interface Props {
  companyId: number;
}
export default function AddingMenuCategoryPage({ companyId }: Props) {
  const router = useRouter();

  const handleAddingMenuCategory = async (formData: FormData) => {
    const response = await addingMenuCategory(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu Category is created successfully");
      router.push("/backoffice/menu-categories");
    }
  };
  return (
    <Box
      component={"form"}
      action={handleAddingMenuCategory}
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
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            defaultValue={""}
            name="addedMenuCategoryName"
          />
        </Box>
        <input type="hidden" name="companyId" value={companyId} />
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
          Add Menu Category
        </Button>
      </Box>
    </Box>
  );
}
