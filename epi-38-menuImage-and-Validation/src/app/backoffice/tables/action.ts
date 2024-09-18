"use server";

import { prisma } from "@/libs/prisma";
import QRCode from "qrcode";
import { redirect } from "next/navigation";
import config from "@/config";
import { put } from "@vercel/blob";
import { Tables } from "@prisma/client";
import { z } from "zod";
import { catchTheError } from "@/libs/action";

const FormSchema = z.object({
  id: z.number().min(1, {
    message: "table id is missing!May be you should contact our support team",
  }),

  name: z.string().min(1, {
    message: "Table Name must be at least one character long",
  }),
});

const addingTableValidate = FormSchema.pick({ name: true });
const deleteTableValidate = FormSchema.pick({ id: true });

export async function addingTable(formData: FormData) {
  try {
    const { name } = addingTableValidate.parse({
      name: formData.get("name"),
    });
    const locationId = Number(formData.get("locationId"));

    const addedTable = await prisma.tables.create({
      data: { name, locationId, qrCodeImageUrl: "" },
    });

    const url = await createQrcodeImageUrl(addedTable);
    await prisma.tables.update({
      data: { ...addedTable, qrCodeImageUrl: url },
      where: { id: addedTable.id },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function updatingTable(formData: FormData) {
  try {
    const { name, id } = FormSchema.parse({
      name: formData.get("name"),
      id: Number(formData.get("tableId")),
    });
    const tableId = id;

    await prisma.tables.update({
      data: { name },
      where: { id: tableId },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function deleteTable(formData: FormData) {
  try {
    console.log("delete the table");
    const { id } = deleteTableValidate.parse({
      id: Number(formData.get("tableId")),
    });
    console.log("id is", id);
    const tableId = id;

    await prisma.tables.delete({ where: { id: tableId } });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function createQrcodeImageUrl(addedTable: Tables) {
  const orderAppUrl = `${config.orderAppUrl}?tableId=${addedTable.id}`;
  const qrCodeImage = await QRCode.toBuffer(orderAppUrl, { scale: 7 });
  const { url } = await put(
    `foodie-pos/table-${addedTable.id}.png`,
    qrCodeImage,
    {
      access: "public",
    }
  );

  return url;
}
