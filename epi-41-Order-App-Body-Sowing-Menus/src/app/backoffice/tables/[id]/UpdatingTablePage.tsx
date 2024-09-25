"use client";

import QrCodeImage from "@/components/QrCodeImage";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteTable, updatingTable } from "../action";
import toast from "react-hot-toast";

interface Props {
  tableToBeUpdatedOrDeleted: Tables;
  id: number;
}
export default function UpdatingTablePage({
  tableToBeUpdatedOrDeleted,
  id,
}: Props) {
  const router = useRouter();

  const handelUpdatingTable = async (formData: FormData) => {
    const response = await updatingTable(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Table is updated successfully");
      router.push("/backoffice/tables");
    }
  };

  const handleDeleteTable = async (formData: FormData) => {
    const response = await deleteTable(formData);
    console.log("response is", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Table is deleted ");
      router.push("/backoffice/tables");
    }
  };

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={handleDeleteTable}
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
        <h2>Updating Table</h2>
        <input type="hidden" name="tableId" value={id} />
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
        action={handelUpdatingTable}
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
          <QrCodeImage
            qrCodeImageUrl={tableToBeUpdatedOrDeleted.qrCodeImageUrl}
          />
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              name="name"
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={tableToBeUpdatedOrDeleted.name}
            />
          </Box>
          <input type="hidden" name="tableId" value={id} />
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
            Update Table
          </Button>
        </Box>
      </Box>
    </>
  );
}
