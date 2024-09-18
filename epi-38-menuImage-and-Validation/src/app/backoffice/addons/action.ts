"use server";

import { catchTheError } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number().min(1, {
    message:
      "addonCategory id is missing!May be you should contact our support team",
  }),

  name: z.string().min(1, {
    message: "AddonCategory Name must be at least one character long",
  }),

  price: z.number({
    message: "price must be number!You should contact our support team",
  }),

  isAvailable: z.boolean({ message: "isRequired field is missing" }),

  addonCategoryId: z.number().min(1, {
    message: "addon must be connected with one addon category",
  }),
});

const addingOrUpdatingAddonValidate = FormSchema.pick({
  name: true,
  addonCategoryId: true,
});

const deleteAddonValidate = FormSchema.pick({
  id: true,
});

export async function addingAddon(formData: FormData) {
  try {
    const { name, addonCategoryId } = addingOrUpdatingAddonValidate.parse({
      name: formData.get("name"),
      addonCategoryId: Number(formData.get("addonCategoryId")),
    });
    console.log("data are", name, Boolean(addonCategoryId));
    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;

    await prisma.addons.create({
      data: { name, price, isAvailable, addonCategoryId },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function updatingAddon(formData: FormData) {
  try {
    const { name, addonCategoryId } = addingOrUpdatingAddonValidate.parse({
      name: formData.get("name"),
      addonCategoryId: Number(formData.get("addonCategoryId")),
    });

    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const id = Number(formData.get("addonId"));

    await prisma.addons.update({
      data: { name, price, isAvailable, addonCategoryId },
      where: { id },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function deleteAddon(formData: FormData) {
  try {
    const { id } = deleteAddonValidate.parse({
      id: Number(formData.get("addonId")),
    });

    await prisma.addons.delete({
      where: { id },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}
