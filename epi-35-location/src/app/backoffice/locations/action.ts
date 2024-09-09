"use server";

import { getCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const companyId = (await getCompanyId()) as number;

  await prisma.locations.create({
    data: { name, companyId },
  });

  redirect("/backoffice/locations");
}

export async function updatingLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  await prisma.locations.update({
    data: { name },
    where: { id: locationId },
  });

  redirect("/backoffice/locations");
}

export async function deleteLocation(formData: FormData) {
  const locationId = Number(formData.get("locationId"));

  await prisma.locations.delete({ where: { id: locationId } });
  redirect("/backoffice/locations");
}
