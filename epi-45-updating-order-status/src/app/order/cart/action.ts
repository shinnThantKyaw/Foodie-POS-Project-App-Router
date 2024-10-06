"use server";

import { OrderWithOrdersAndAddon } from "@/components/orderAppComponents/MenuDetailsPageBody";
import { prisma } from "@/libs/prisma";
import { OrdersAndAddons, ORDERSTATUS, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { number } from "zod";
import { OrderWithOrdersAndAddonAndMenus } from "../active-orders/page";
import { OrdersWithMenusAndOrdersAndAddonsAndTables } from "@/app/backoffice/orders/[status]/page";

interface CreateOrUpdateCartOrder {
  tableId: number;
  menuId: number;
  quantity: number;
  addonIds: number[];
  orderId?: number;
}
export async function createCartOrder({
  tableId,
  menuId,
  quantity,

  addonIds,
}: CreateOrUpdateCartOrder) {
  const order = await prisma.orders.create({
    data: { menuId, tableId, quantity },
  });

  if (addonIds.length) {
    const data = addonIds.map((addonId) => ({ orderId: order.id, addonId }));

    await prisma.ordersAndAddons.createMany({ data });
  }

  redirect(`/order?tableId=${tableId}`);
}

export async function updateTheOrderInCart({
  tableId,
  menuId,
  quantity,

  addonIds,
  orderId,
}: CreateOrUpdateCartOrder) {
  await prisma.orders.update({ data: { quantity }, where: { id: orderId } });

  await prisma.ordersAndAddons.deleteMany({ where: { orderId } });

  const data = addonIds.map((id) => ({
    orderId: orderId as number,
    addonId: id,
  }));

  await prisma.ordersAndAddons.createMany({ data });

  redirect(`/order?tableId=${tableId}`);
}

export async function getTotalPriceOfTable(
  tableId: number,
  status?: ORDERSTATUS
) {
  let ordersInCart: OrderWithOrdersAndAddonAndMenus[];
  if (status) {
    ordersInCart = await prisma.orders.findMany({
      where: { tableId, status },
      include: { menu: true, ordersAndAddons: true },
    });
  } else {
    ordersInCart = await prisma.orders.findMany({
      where: { tableId },
      include: { menu: true, ordersAndAddons: true },
    });
  }

  let totalPrice = 0;

  for (const orderInCart of ordersInCart) {
    let priceOfEachOrder = 0;

    const menu = orderInCart.menu;

    priceOfEachOrder += menu.price || 0;

    const addonIds = orderInCart.ordersAndAddons.map((item) => item.addonId);
    const addons = await prisma.addons.findMany({
      where: { id: { in: addonIds } },
    });

    for (const addon of addons) {
      priceOfEachOrder += addon.price;
    }
    totalPrice += priceOfEachOrder * orderInCart.quantity;
  }
  return totalPrice;
}

export async function getTotalPriceOfOrder(
  order: OrdersWithMenusAndOrdersAndAddonsAndTables
) {
  let totalPrice = order.menu.price || 0;

  const addonIds = order.ordersAndAddons.map((item) => item.addonId);
  const addons = await prisma.addons.findMany({
    where: { id: { in: addonIds } },
  });

  for (const addon of addons) {
    totalPrice += addon.price;
  }
  totalPrice = totalPrice * order.quantity;

  return totalPrice;
}

export async function deleteTheOrderInCart(formData: FormData) {
  const tableId = formData.get("tableId");
  const id = Number(formData.get("orderId"));

  await prisma.ordersAndAddons.deleteMany({ where: { orderId: id } });
  await prisma.orders.delete({ where: { id } });

  revalidatePath(`/order/cart?tableId=${tableId}`);
}

export async function confirmTheOrders(formData: FormData) {
  const tableId = formData.get("tableId");
  const oredrIdsInCart = formData.getAll("orderId").map((id) => Number(id));

  await prisma.orders.updateMany({
    data: { status: ORDERSTATUS.PENDING },
    where: { id: { in: oredrIdsInCart } },
  });

  revalidatePath("/backoffice/orders/pending");
  revalidatePath("/order/cart");
  redirect(`/order/active-orders?tableId=${tableId}`);
}

export async function updateOrderStatus(status: ORDERSTATUS, id: number) {
  await prisma.orders.update({ data: { status }, where: { id } });
}
