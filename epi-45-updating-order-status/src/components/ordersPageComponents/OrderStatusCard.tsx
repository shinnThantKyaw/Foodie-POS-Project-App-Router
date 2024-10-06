"use client";

import { OrdersWithMenusAndOrdersAndAddonsAndTables } from "@/app/backoffice/orders/[status]/page";
import { updateOrderStatus } from "@/app/order/cart/action";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  order: OrdersWithMenusAndOrdersAndAddonsAndTables;
  isAdmin: boolean;
}
export default function OrderStatusCard({ order, isAdmin }: Props) {
  const [status, setStatus] = useState<ORDERSTATUS>(order.status);
  const router = useRouter();

  useEffect(() => {
    if (status !== ORDERSTATUS.COMPLETE) {
      const intervalId = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [order]);

  const handleChangeStatus = async (event: SelectChangeEvent) => {
    setStatus(event.target.value as ORDERSTATUS);
    await updateOrderStatus(event.target.value as ORDERSTATUS, order.id);
  };
  return (
    <Box
      sx={{
        height: "20%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
      }}
    >
      <Typography>Status</Typography>
      {isAdmin ? (
        <Box
          sx={{
            minWidth: 120,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              sx={{ maxHeight: 40 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChangeStatus}
            >
              <MenuItem value={ORDERSTATUS.PENDING}>
                {ORDERSTATUS.PENDING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COOKING}>
                {ORDERSTATUS.COOKING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COMPLETE}>
                {ORDERSTATUS.COMPLETE}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Typography>{order.status}</Typography>
      )}
    </Box>
  );
}
