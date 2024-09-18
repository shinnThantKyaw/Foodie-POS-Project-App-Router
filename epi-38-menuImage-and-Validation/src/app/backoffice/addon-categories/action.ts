"use server";

import { catchTheError } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { AddonCategoriesAndMenus } from "@prisma/client";
import { error } from "console";
import { redirect } from "next/navigation";
import { boolean, z } from "zod";

const formSchema = z.object({
  id: z.number({
    message:
      "addonCategory id is missing!May be you should contact our support team",
  }),
  name: z.string().min(1, {
    message: "AddonCategory Name must be at least one character long",
  }),
  isRequired: z.boolean({ message: "isRequired field is missing" }),
  selectedMenuIds: z.array(z.number()).min(1, {
    message: "addonCategory must be connected with at least one menu",
  }),
});

const addingOrUpdatingAddonCategoryValidate = formSchema.pick({
  name: true,
  selectedMenuIds: true,
});

const deleteAddonCategoryValidate = formSchema.pick({
  id: true,
});

export async function addingAddonCategory(formData: FormData) {
  try {
    const { name, selectedMenuIds } =
      addingOrUpdatingAddonCategoryValidate.parse({
        name: formData.get("name"),
        selectedMenuIds: formData.getAll("menuId").map((item) => Number(item)),
      });
    const isRequired = formData.get("isRequired") ? true : false;

    const addedAddonCategory = await prisma.addonCategories.create({
      data: { name, isRequired },
    });

    const data = selectedMenuIds.map((id) => ({
      menuId: id,
      addonCategoryId: addedAddonCategory.id,
    }));
    await prisma.addonCategoriesAndMenus.createMany({ data: data });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function updatingAddonCategory(formData: FormData) {
  try {
    const { name, selectedMenuIds } =
      addingOrUpdatingAddonCategoryValidate.parse({
        name: formData.get("name"),
        selectedMenuIds: formData.getAll("menuId").map((item) => Number(item)),
      });

    const isRequired = formData.get("isRequired") ? true : false;

    const addonCategoryId = Number(formData.get("addonCategoryId"));

    const updatedMenuIds = selectedMenuIds;

    await prisma.addonCategories.update({
      data: { name, isRequired },
      where: { id: addonCategoryId },
    });

    const previousAddonCategoriesAndMenus =
      await prisma.addonCategoriesAndMenus.findMany({
        where: { addonCategoryId },
      });
    const previousMenuIds = previousAddonCategoriesAndMenus.map(
      (item) => item.menuId
    );

    const isSameMenuIds =
      updatedMenuIds.length === previousMenuIds.length &&
      updatedMenuIds.map((id) => previousMenuIds.includes(id));

    if (!isSameMenuIds) {
      const data = updatedMenuIds.map((id) => ({
        menuId: id,
        addonCategoryId,
      }));

      await prisma.addonCategoriesAndMenus.deleteMany({
        where: { addonCategoryId },
      });
      await prisma.addonCategoriesAndMenus.createMany({ data: data });
    }
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}
export async function deleteAddonCategory(formData: any) {
  try {
    const { id } = deleteAddonCategoryValidate.parse({
      id: Number(formData.get("addonCategoryId")),
    });

    await prisma.addons.deleteMany({ where: { addonCategoryId: id } });
    await prisma.addonCategoriesAndMenus.deleteMany({
      where: { addonCategoryId: id },
    });
    await prisma.addonCategories.delete({
      where: { id: id },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}
