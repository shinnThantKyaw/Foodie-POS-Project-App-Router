import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}
export async function GET(req: Request, { params }: Props) {
  const menuId = Number(params.id);
  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { menusCategoriesAndMenus: true },
  });

  return NextResponse.json(JSON.stringify(menuToBeUpdatedOrDeleted), {
    status: 200,
  });
}
export async function DELETE(req: Request, { params }: Props) {
  const menuId = Number(params.id);
  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { menusCategoriesAndMenus: true },
  });

  await prisma.menusCategoriesAndMenus.deleteMany({
    where: { menuId: menuId },
  });
  await prisma.menus.delete({ where: { id: menuId } });

  return NextResponse.json(null, { status: 200 });
}
