"use server";

import { catchTheError, getCurrentLocationId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number().min(1, {
    message: "id is missing!May be you should contact our support team",
  }),
  name: z.string().min(1, "Name must be at least 1 character long"),
  price: z.number({
    message: " price must be number!You should contact our support team",
  }),
  isAvailable: z.boolean({ message: "Is Available field is missing" }),
  selectedMenuCategoryIds: z
    .array(z.string())
    .min(1, "Menu must be connect with at least one menu category"),
});

const menuUpdateOrDeleteValidate = FormSchema.omit({
  id: true,
  price: true,
  isAvailable: true,
});

export async function addingMenu(formData: FormData) {
  try {
    const { name, selectedMenuCategoryIds } = menuUpdateOrDeleteValidate.parse({
      name: formData.get("name"),
      selectedMenuCategoryIds: formData.getAll("menuCategoryId"),
    });
    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const imageUrl = formData.get("imageUrl") as string;

    const addedMenu = await prisma.menus.create({
      data: { name, price, imageUrl: imageUrl ? imageUrl : "" },
    });

    const data: any = selectedMenuCategoryIds.map((id) => ({
      menuId: addedMenu.id,
      menuCategoryIds: Number(id),
    }));
    await prisma.menusCategoriesAndMenus.createMany({ data: data });

    if (!isAvailable) {
      const currentLocationId = (await getCurrentLocationId()) as number;
      await prisma.disableMenusAndLocations.create({
        data: { menuId: addedMenu.id, locationId: currentLocationId },
      });
    }

    /*     if (file.size) {
      const imageBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(imageBuffer);
      const { url } = await put(
        `foodie-pos/table-${new Date().getTime()}-${file.name}`,
        buffer,
        {
          access: "public",
        }
      );
      await prisma.menus.update({
        data: { ...addedMenu, imageUrl: url },
        where: { id: addedMenu.id },
      });
    }
 */
  } catch (error) {
    return catchTheError(error);
  }
  return { error: null };
}

export async function updatingMenu(formData: FormData) {
  try {
    const { name, selectedMenuCategoryIds } = menuUpdateOrDeleteValidate.parse({
      name: formData.get("name"),
      selectedMenuCategoryIds: formData.getAll("menuCategoryId"),
    });
    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const menuId = Number(formData.get("menuId"));
    const updatedMenuCategoryIds = selectedMenuCategoryIds;
    const isCurrentNotAvailableMenu = Number(
      formData.get("isCurrentNotAvailableMenu")
    );

    const imageUrl = formData.get("imageUrl") as string;

    if (imageUrl) {
      await prisma.menus.update({
        data: { imageUrl },
        where: { id: menuId },
      });
    }
    await prisma.menus.update({
      data: { name, price },
      where: { id: menuId },
    });

    const previousMenuCategoriesAndMenus =
      await prisma.menusCategoriesAndMenus.findMany({ where: { menuId } });
    const previousMenuCategoryIds = previousMenuCategoriesAndMenus.map(
      (item) => item.menuCategoryIds
    );

    const isSameMenuCategoryIds =
      updatedMenuCategoryIds.length === previousMenuCategoriesAndMenus.length &&
      updatedMenuCategoryIds.every((id) =>
        previousMenuCategoryIds.includes(Number(id))
      );

    if (!isSameMenuCategoryIds) {
      const data: any = updatedMenuCategoryIds.map((id) => ({
        menuId: menuId,
        menuCategoryIds: Number(id),
      }));

      await prisma.menusCategoriesAndMenus.deleteMany({
        where: { menuId: menuId },
      });
      await prisma.menusCategoriesAndMenus.createMany({ data: data });
    }

    if (isAvailable) {
      if (isCurrentNotAvailableMenu) {
        await prisma.disableMenusAndLocations.delete({
          where: { id: isCurrentNotAvailableMenu },
        });
      }
    } else {
      {
        !isCurrentNotAvailableMenu;
      }
      {
        const currentLocationId = (await getCurrentLocationId()) as number;
        await prisma.disableMenusAndLocations.create({
          data: { menuId, locationId: currentLocationId },
        });
      }
    }
  } catch (error) {
    return catchTheError(error);
  }
  return { error: null };
}

export async function deleteMenu(formData: FormData) {
  try {
    const menuId = Number(formData.get("menuId"));

    await prisma.menusCategoriesAndMenus.deleteMany({ where: { menuId } });
    await prisma.addonCategoriesAndMenus.deleteMany({ where: { menuId } });
    await prisma.disableMenusAndLocations.deleteMany({ where: { menuId } });
    await prisma.menus.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
  } catch (error) {
    return { error: "Something went wrong! Please contact our support team" };
  }
  redirect("/backoffice/menus");
}
