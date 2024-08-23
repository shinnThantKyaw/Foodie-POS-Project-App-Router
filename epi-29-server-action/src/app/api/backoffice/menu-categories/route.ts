import { prisma } from "@/libs/prisma";
import { MenusCategories } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const menuCategories: MenusCategories[] =
    await prisma.menusCategories.findMany();
  return NextResponse.json(JSON.stringify(menuCategories), { status: 200 });
}
export async function POST(req: Request) {
  const menuCategory: MenusCategories = await req.json();
  await prisma.menusCategories.create({ data: { name: menuCategory.name } });

  return NextResponse.json(null, { status: 200 });
}
