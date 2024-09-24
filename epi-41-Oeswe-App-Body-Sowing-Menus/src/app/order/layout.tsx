import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function OrderAppLayout({ children }: Props) {
  return <Box sx={{ minHeight: "100vh", bgcolor: "#fefae0" }}>{children}</Box>;
}
