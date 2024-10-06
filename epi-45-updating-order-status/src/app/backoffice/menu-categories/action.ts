"use server";

import {
  catchTheError,
  getCurrentLocation,
  getCurrentLocationId,
} from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "MenuCategory name must be at least one character long",
  }),
});

export async function addingMenuCategory(formData: any) {
  try {
    const { name } = FormSchema.parse({
      name: formData.get("addedMenuCategoryName"),
    });

    const companyId = Number(formData.get("companyId"));
    await prisma.menusCategories.create({
      data: { name, companyId },
    });
  } catch (err) {
    return catchTheError(err);
  }
  revalidatePath("/backoffice/menu-categories");
  return { error: null };
}

export async function updatingMenuCategory(formData: any) {
  try {
    const { name } = FormSchema.parse({
      name: formData.get("updatedMenuCategoryName"),
    });

    console.log("naem is", name);
    const menuCategoryId = Number(formData.get("menuCategoryId"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const isCurrentNotAvailableMenuCategory = Number(
      formData.get("isCurrentNotAvailableMenuCategory")
    );
    const currentLocationId = (await getCurrentLocationId()) as number;

    await prisma.menusCategories.update({
      data: { name },
      where: { id: menuCategoryId },
    });

    if (isAvailable) {
      if (isCurrentNotAvailableMenuCategory) {
        await prisma.disableMenuCategoriesAndLocations.delete({
          where: { id: isCurrentNotAvailableMenuCategory },
        });
      }
    } else {
      if (!isCurrentNotAvailableMenuCategory) {
        await prisma.disableMenuCategoriesAndLocations.create({
          data: { menuCategoryId, locationId: currentLocationId },
        });
      }
    }
  } catch (err) {
    return catchTheError(err);
  }
  revalidatePath("/backoffice/menu-categories");

  return { error: null };
}

export async function deleteMenuCategory(formData: any) {
  try {
    const menuCategoryId = Number(formData.get("menuCategoryId"));

    await prisma.menusCategoriesAndMenus.deleteMany({
      where: { menuCategoryIds: menuCategoryId },
    });
    await prisma.disableMenuCategoriesAndLocations.deleteMany({
      where: { menuCategoryId },
    });
    await prisma.menusCategories.update({
      data: { isArchived: true },
      where: { id: menuCategoryId },
    });
  } catch (err) {
    return {
      error: "Something went wrong. Please contact our support team",
    };
  }
  revalidatePath("/backoffice/menu-categories");

  return { error: null };
}
