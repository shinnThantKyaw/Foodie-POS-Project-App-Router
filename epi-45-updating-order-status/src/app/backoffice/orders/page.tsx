import { Box } from "@mui/material";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  redirect("/backoffice/orders/pending");
}
