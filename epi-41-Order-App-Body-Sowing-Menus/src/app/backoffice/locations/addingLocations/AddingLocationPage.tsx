"use client";

import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { addingLocation } from "../action";
import { useRouter } from "next/navigation";

export default function AddingLocatitonPage() {
  const router = useRouter();

  const handleAddingLocation = async (formData: FormData) => {
    const response = await addingLocation(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Location is created successfully");
      router.push("/backoffice/locations");
    }
  };

  return (
    <Box
      component={"form"}
      action={handleAddingLocation}
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
          Add Location
        </Button>
      </Box>
    </Box>
  );
}
