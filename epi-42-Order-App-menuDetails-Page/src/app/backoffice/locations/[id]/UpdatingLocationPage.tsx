"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Locations } from "@prisma/client";
import { deleteLocation, updatingLocation } from "../action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  locationToBeUpdatedOrDeleted: Locations;
  id: number;
  currentLocationId: number;
}
export default function UpdatingLocationPage({
  locationToBeUpdatedOrDeleted,
  id,
  currentLocationId,
}: Props) {
  const router = useRouter();

  const handleUpdatingLocation = async (formData: FormData) => {
    const response = await updatingLocation(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Location is updated successfully");
      router.push("/backoffice/locations");
    }
  };

  const handleDeleteLocation = async (formData: FormData) => {
    const response = await deleteLocation(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Location is deleted ");
      router.push("/backoffice/locations");
    }
  };

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={handleDeleteLocation}
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
        <h2>Updating Location</h2>
        <input type="hidden" name="locationId" value={id} />
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
        action={handleUpdatingLocation}
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
              defaultValue={locationToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={id === currentLocationId}
                  name="locationIsSelected"
                />
              }
              label="CurrentLocation"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" name="locationId" value={id} />
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
            Update Location
          </Button>
        </Box>
      </Box>
    </>
  );
}
