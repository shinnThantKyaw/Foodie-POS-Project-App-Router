import { prisma } from "@/libs/prisma";
import { Box, Button, Divider, Typography } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import Link from "next/link";
import { getTotalPriceOfTable } from "../cart/action";
import OrderCard from "@/components/ordersPageComponents/OrderCard";
import { OrdersWithMenusAndOrdersAndAddonsAndTables } from "@/app/backoffice/orders/[status]/page";

interface Props {
  searchParams: {
    tableId: string;
  };
}
export type OrderWithOrdersAndAddonAndMenus = Prisma.OrdersGetPayload<{
  include: { ordersAndAddons: true; menu: true };
}>;

export default async function ActiveOrders({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);

  const ordersInCart: OrdersWithMenusAndOrdersAndAddonsAndTables[] =
    await prisma.orders.findMany({
      where: { tableId, NOT: { status: ORDERSTATUS.CART } },
      include: { menu: true, ordersAndAddons: true, table: true },
      orderBy: { id: "asc" },
    });

  const totalPrice = await getTotalPriceOfTable(tableId);

  if (!ordersInCart.length)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" sx={{ color: "#219ebc" }}>
          There is no active order yet! Go order some tasty menus
        </Typography>
        <Link href={`/order?tableId=${tableId}`}>
          {" "}
          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#219ebc",
              ":hover": { bgcolor: "#5cacd1", boxShadow: 4 },
            }}
          >
            Go To Menus
          </Button>
        </Link>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        paddingBottom: "35px",
      }}
    >
      <Typography variant="h4" sx={{ mt: 3 }}>
        Active Orders
      </Typography>
      <Box>
        <Typography>Total Price = {totalPrice}</Typography>
      </Box>
      <Link href={`/order?tableId=${tableId}`}>
        <Button
          variant="contained"
          sx={{
            mt: 3,

            bgcolor: "#219ebc",
            ":hover": { bgcolor: "#5cacd1", boxShadow: 4 },
          }}
        >
          {" "}
          Go to menus
        </Button>
      </Link>

      <Box
        sx={{
          mt: 5,
          width: "85vw",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ordersInCart.map(async (order, index) => {
          return (
            <OrderCard
              key={order.id}
              order={order}
              index={index}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );
}
