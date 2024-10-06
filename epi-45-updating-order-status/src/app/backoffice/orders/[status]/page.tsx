import ButtonsGroup from "@/components/ordersPageComponents/ButtonsGroup";
import NoOrderPage from "@/components/ordersPageComponents/NoOrderPage";
import OrderCard from "@/components/ordersPageComponents/OrderCard";
import { getTablesByLocationId } from "@/libs/action";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

interface Props {
  params: {
    status: ORDERSTATUS;
  };
}

export type OrdersWithMenusAndOrdersAndAddonsAndTables =
  Prisma.OrdersGetPayload<{
    include: { menu: true; ordersAndAddons: true; table: true };
  }>;

export type AddonsWithAddonCategories = Prisma.AddonsGetPayload<{
  include: { addonCategories: true };
}>;

export default async function OrdersPage({ params }: Props) {
  const status = params.status.toUpperCase() as ORDERSTATUS;
  const tables = await getTablesByLocationId();
  const tableIds = tables.map((table) => table.id);

  const orders: OrdersWithMenusAndOrdersAndAddonsAndTables[] =
    await prisma.orders.findMany({
      where: { tableId: { in: tableIds }, status },
      include: { menu: true, ordersAndAddons: true, table: true },
    });

  if (!orders.length) {
    return (
      <Box>
        <ButtonsGroup status={status as ORDERSTATUS} />
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NoOrderPage />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <ButtonsGroup status={status} />
      <Box
        sx={{
          mt: 5,
          width: "85vw",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {orders.map(async (order, index) => {
          return (
            <OrderCard key={order.id} order={order} index={index} isAdmin />
          );
        })}
      </Box>
    </Box>
  );
}
