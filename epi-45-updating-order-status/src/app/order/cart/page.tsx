import { prisma } from "@/libs/prisma";
import { Box, Button, Divider, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import {
  confirmTheOrders,
  deleteTheOrderInCart,
  getTotalPriceOfTable,
} from "./action";
import Link from "next/link";
import { OrderWithOrdersAndAddonAndMenus } from "../active-orders/page";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export default async function Cart({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);

  const ordersInCart: OrderWithOrdersAndAddonAndMenus[] =
    await prisma.orders.findMany({
      where: { tableId, status: ORDERSTATUS.CART },
      include: { menu: true, ordersAndAddons: true },
      orderBy: { id: "asc" },
    });

  const totalPrice = await getTotalPriceOfTable(tableId, ORDERSTATUS.CART);

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
          There is no menu in cart! Go order some tasty menus
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
      {ordersInCart.map(async (order, index) => {
        const menu = order.menu;
        const addonIds = order.ordersAndAddons.map((item) => item.addonId);
        const addons = await prisma.addons.findMany({
          where: { id: { in: addonIds } },
        });
        return (
          <Box key={order.id}>
            <Box
              sx={{
                width: "400px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                padding: "20px",
                mt: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      width: "25px",
                      height: "25px",
                      backgroundColor: "#219ebc",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "7px",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography variant="h6">{menu.name}</Typography>
                </Box>
                <Typography>{menu.price}</Typography>
              </Box>
              <Box sx={{ mt: 1.5, ml: 4 }}>
                {addons.map((addon) => {
                  return (
                    <Box
                      key={addon.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{addon.name}</Typography>
                      <Typography>{addon.price}</Typography>
                    </Box>
                  );
                })}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ borderTop: "3px solid lightgray", paddingLeft: 3 }}
                  >
                    x{order.quantity}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Link
                href={`/order/menus/${menu.id}?tableId=${tableId}&orderId=${order.id}`}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#219ebc",
                    ":hover": { bgcolor: "#5cacd1", boxShadow: 4 },
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Box component="form" action={deleteTheOrderInCart}>
                <input type="hidden" value={order.id} name="orderId" />
                <input type="hidden" value={tableId} name="tableId" />
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 1.5 }}
                  type="submit"
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}

      <Box sx={{ width: "400px" }}>
        <Divider sx={{ borderBottomWidth: 3.5, mt: 5, mb: 3 }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography>Total Price = {totalPrice}</Typography>
        </Box>
        <Box
          component="form"
          action={confirmTheOrders}
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          {ordersInCart.map((order) => {
            return (
              <input
                key={order.id}
                type="hidden"
                value={order.id}
                name="orderId"
              />
            );
          })}

          <input type="hidden" value={tableId} name="tableId" />

          <Button
            variant="contained"
            sx={{
              color: "inherit",
              bgcolor: "#219ebc",
              ":hover": { bgcolor: "#5cacd1", boxShadow: 4 },
            }}
            type="submit"
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
