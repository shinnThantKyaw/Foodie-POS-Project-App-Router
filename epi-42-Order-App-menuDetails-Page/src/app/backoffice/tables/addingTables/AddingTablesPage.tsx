"use client";

import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addingTable } from "../action";

interface Props {
  currentLocationId: number;
}

export default function AddingTablesPage({ currentLocationId }: Props) {
  const router = useRouter();

  const handleAddingTable = async (formData: FormData) => {
    const response = await addingTable(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Table is added successfully");
      router.push("/backoffice/tables");
    }
  };

  return (
    <Box
      component={"form"}
      action={handleAddingTable}
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
        <input type="hidden" name="locationId" value={currentLocationId} />
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
          Add Table
        </Button>
      </Box>
    </Box>
  );
}
