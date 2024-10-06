import {
  AddonsWithAddonCategories,
  OrdersWithMenusAndOrdersAndAddonsAndTables,
} from "@/app/backoffice/orders/[status]/page";
import { getTotalPriceOfOrder } from "@/app/order/cart/action";
import ButtonsGroup from "@/components/ordersPageComponents/ButtonsGroup";
import Buttons from "@/components/ordersPageComponents/ButtonsGroup";
import { Box, Card, Divider, Typography } from "@mui/material";
import { Tables } from "@prisma/client";
import OrderStatusCard from "./OrderStatusCard";
import { prisma } from "@/libs/prisma";

interface Props {
  order: OrdersWithMenusAndOrdersAndAddonsAndTables;
  index: number;
  isAdmin: boolean;
}

export default async function OrderCard({ order, index, isAdmin }: Props) {
  const menu = order.menu;

  const addonIds = order.ordersAndAddons.map((item) => item.addonId);
  const addons: AddonsWithAddonCategories[] = await prisma.addons.findMany({
    where: { id: { in: addonIds } },
    include: { addonCategories: true },
  });

  const table = order.table;

  return (
    <Box key={order.id} sx={{ mb: 3, mx: 1.5 }}>
      <Card sx={{ width: 300, height: 300 }}>
        <Box
          sx={{
            bgcolor: "#023047",
            color: "#8ecae6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "20%",
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                width: "23px",
                height: "23px",
                fontSize: "15px",
                backgroundColor: "#219ebc",
                color: "#023047",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "4px",
              }}
            >
              {index + 1}
            </Typography>
            {menu.name} x{order.quantity}
          </Box>
          {isAdmin ? (
            <Typography>{table.name}</Typography>
          ) : (
            <Typography>{`${await getTotalPriceOfOrder(order)} Ks`}</Typography>
          )}
        </Box>
        <Box
          sx={{
            px: 2,
            pt: 2,
            height: "60%",
            overflowY: "scroll",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "8px", // Set the width of the scrollbar
              height: "8px", // Set the height for horizontal scrollbar
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Color of the scrollbar thumb
              borderRadius: "4px", // Rounded corners for the thumb
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(0, 0, 0, 0.1)", // Background for the scrollbar track
            },
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.1)", // Thumb color and track
          }}
        >
          <Box>
            {addons.length ? (
              addons.map((addon) => {
                return (
                  <Box key={addon.id}>
                    {" "}
                    <Typography sx={{ fontWeight: "600" }}>
                      {addon.addonCategories.name}
                    </Typography>
                    <Box
                      sx={{
                        px: 1,

                        fontStyle: "italic",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{addon.name}</Typography>
                      <Typography>{addon.price}</Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box>
                <Typography sx={{ fontWeight: "600" }}>No addons</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Divider />
        <OrderStatusCard order={order} isAdmin={isAdmin} />
        {/* <OrderStatusUpdateCard order={order} isAdmin={isAdmin} /> */}
      </Card>
    </Box>
  );
}
