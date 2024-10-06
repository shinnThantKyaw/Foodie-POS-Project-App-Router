"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NoOrderPage() {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Typography variant="h4">There is no orders yet</Typography>
    </Box>
  );
}
