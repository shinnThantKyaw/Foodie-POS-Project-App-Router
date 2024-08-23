import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Menus, MenusCategories } from "@prisma/client";
import { addingMenuCategory } from "../action";

export default function addingMenuCategories() {
  return (
    <Box
      component={"form"}
      action={addingMenuCategory}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#219ebc",
          width: "400px",
          height: "400px",
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
