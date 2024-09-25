"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Company } from "@prisma/client";
import { updatingCompany } from "./action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  company: Company | null;
}

export default function UpdatingSettingPage({ company }: Props) {
  const router = useRouter();

  const handleUpdatingCompany = async (formData: FormData) => {
    const response = await updatingCompany(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Company  is updated successfully");
      router.push("/backoffice");
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
          action={handleUpdatingCompany}
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
              defaultValue={company?.name}
              name="name"
            />
          </Box>

          <input type="hidden" value={company?.id} name="id" />
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
      </Box>
    </Box>
  );
}
