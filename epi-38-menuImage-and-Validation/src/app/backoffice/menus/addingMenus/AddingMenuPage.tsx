"use client";

import { addingMenu } from "@/app/backoffice/menus/action";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenusCategories } from "@prisma/client";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  menuCategories: MenusCategories[];
}
export default function AddingMenuPage({ menuCategories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Box
      component={"form"}
      action={async (formData: FormData) => {
        setLoading(true);
        const response = await addingMenu(formData);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success("Menu is created successfully");
          setLoading(false);
          router.push("/backoffice/menus");
        }
      }}
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
          {menuCategories.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="menuCategoryId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
        <TextField
          type="file"
          name="file"
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "5px",
            mt: 2.5,
            mb: 1,
          }}
        />
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
          Add Menu
        </Button>
      </Box>
    </Box>
  );
}
