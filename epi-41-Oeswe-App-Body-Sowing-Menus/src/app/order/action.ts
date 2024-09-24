"use server";

import { prisma } from "@/libs/prisma";

export async function getLocationByTableId(tableId: number) {
  const table = await prisma.tables.findFirst({ where: { id: tableId } });
  const location = await prisma.locations.findFirst({
    where: { id: Number(table?.locationId) },
  });
  return location;
}

export async function getCompanyByTableId(tableId: number) {
  const location = await getLocationByTableId(tableId);

  const company = await prisma.company.findFirst({
    where: { id: location?.companyId },
  });

  return company;
}

export async function getMenuCategoriesByTableId(tableId: number) {
  const company = await getCompanyByTableId(tableId);

  const allMenuCategories = await prisma.menusCategories.findMany({
    where: { companyId: company?.id, isArchived: false },
  });

  const location = await getLocationByTableId(tableId);
  const disableMenuCategoriesAndLocation =
    await prisma.disableMenuCategoriesAndLocations.findMany({
      where: { locationId: Number(location?.id) },
    });
  const disableMenuCategoryIds = disableMenuCategoriesAndLocation.map(
    (item) => item.menuCategoryId
  );

  const menuCategories = allMenuCategories.filter(
    (menuCategory) => !disableMenuCategoryIds.includes(menuCategory.id)
  );

  return menuCategories;
}

export async function getMenusByMenuCategoryId(
  menuCategoryId: number,
  tableId: number
) {
  const menuCategory = await prisma.menusCategories.findFirst({
    where: { id: menuCategoryId },
    include: { menusCategoriesAndMenus: true },
  });

  const menuIdsByMenuCategoryId = menuCategory?.menusCategoriesAndMenus.map(
    (item) => item.menuId
  );

  const allMenusByMenuCategoryId = await prisma.menus.findMany({
    where: { id: { in: menuIdsByMenuCategoryId }, isArchived: false },
    include: { disableMenusAndLocations: true },
  });

  const location = await getLocationByTableId(tableId);

  const disableMenus = allMenusByMenuCategoryId.filter((menu) =>
    menu.disableMenusAndLocations.find(
      (item) => item.id === menu.id && item.locationId === location?.id
    )
  );

  const disableMenuIds = disableMenus.map((menu) => menu.id);

  const menus = allMenusByMenuCategoryId.filter(
    (menu) => !disableMenuIds.includes(menu.id)
  );

  return menus;
}
