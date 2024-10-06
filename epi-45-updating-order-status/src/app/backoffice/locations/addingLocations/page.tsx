import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { addingLocation } from "../action";
import { getLocationsByCompanyId } from "@/libs/action";
import AddingLocatitonPage from "./AddingLocationPage";

export default async function AddingLocations() {
  return <AddingLocatitonPage />;
}
