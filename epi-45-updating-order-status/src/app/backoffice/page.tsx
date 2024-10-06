import { Box } from "@mui/material";
import { redirect } from "next/navigation";

export default async function BackofficePage() {
  redirect("/backoffice/orders/pending");
}
