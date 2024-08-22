import { prisma } from "@/libs/prisma";
import { Menus, MenusCategories } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const menus: Menus[] = await prisma.menus.findMany();
  return NextResponse.json(JSON.stringify(menus), { status: 200 });
}
export async function POST(req: Request) {
  const menu = await req.json();
  const menuCategoryIds: number[] = menu.menuCategoryIds;

  const addedMenu = await prisma.menus.create({
    data: {
      name: menu.name,
      price: menu.price,
      isAvailable: menu.isAvailable,
    },
  });
  /*    [{id:1,menuId:1,menuCategoryIds:1}] */
  const data: any = menuCategoryIds.map((menuCategoryId) => ({
    menuId: addedMenu.id,
    menuCategoryIds: menuCategoryId,
  }));
  await prisma.menusCategoriesAndMenus.createMany({
    data: data,
  });

  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req: Request) {
  const menu = await req.json();
  const menuCategoryIds: number[] = menu.menuCategoryIds;

  await prisma.menus.update({
    data: {
      name: menu.name,
      price: menu.price,
      isAvailable: menu.isAvailable,
    },
    where: { id: menu.id },
  });

  const data = menuCategoryIds.map((menuCategoryId) => ({
    menuId: menu.id,
    menuCategoryIds: menuCategoryId,
  }));

  // menu ကို menu category မထည့်ဘဲ add မိရင် ဖြေရှင်းဖို့ ဒီကောင်ထည့်ထားတာ
  if (menu.menusCategoriesAndMenus.length === 0) {
    await prisma.menusCategoriesAndMenus.createMany({
      data: data,
    });
    return NextResponse.json(null, { status: 200 });
  }

  const previousMenucategoriesAndMenus =
    await prisma.menusCategoriesAndMenus.findMany({
      where: { menuId: menu.id },
    });
  const previousMenuCategoryIds: number[] = previousMenucategoriesAndMenus.map(
    (item) => item.menuCategoryIds
  );

  const updatedMenuCategoryIds: number[] = menu.menuCategoryIds;

  const isSameMenuCategoryId =
    updatedMenuCategoryIds.length === previousMenuCategoryIds.length &&
    updatedMenuCategoryIds.every((updatedMenuCategoryId) =>
      previousMenuCategoryIds.includes(updatedMenuCategoryId)
    );

  console.log("previous is ", previousMenuCategoryIds);
  console.log("updated is ", updatedMenuCategoryIds);
  console.log("boolen is ", isSameMenuCategoryId);

  if (!isSameMenuCategoryId) {
    await prisma.menusCategoriesAndMenus.deleteMany({
      where: { menuId: menu.id },
    });

    await prisma.menusCategoriesAndMenus.createMany({
      data: data,
    });
  }

  return NextResponse.json(null, { status: 200 });
}
