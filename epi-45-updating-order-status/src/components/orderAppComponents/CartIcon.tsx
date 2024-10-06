import { prisma } from "@/libs/prisma";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Link from "next/link";

interface Props {
  tableId: number;
}
export default async function CartIcon({ tableId }: Props) {
  const ordersInCart = await prisma.orders.findMany({
    where: { tableId, status: ORDERSTATUS.CART },
    include: { menu: true, ordersAndAddons: true },
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: 85,
        right: 15,
        color: "#219ebc",
        display: "flex",
      }}
    >
      <Typography variant="h5">{ordersInCart.length}</Typography>
      <Link href={`/order/cart?tableId=${tableId}`}>
        <ShoppingCartCheckout sx={{ fontSize: 40 }} />
      </Link>
    </Box>
  );
}
