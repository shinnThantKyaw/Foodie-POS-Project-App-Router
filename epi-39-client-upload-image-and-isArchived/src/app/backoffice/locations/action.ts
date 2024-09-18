"use server";

import {
  catchTheError,
  getCompanyId,
  getCurrentUserAndSelectedLocation,
  getLocationsByCompanyId,
} from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Location name must be at least one character long" }),
});

const addingOrUpdatingLocationValidate = FormSchema.pick({ name: true });

export async function addingLocation(formData: FormData) {
  console.log("formdata is", formData);
  try {
    console.log("hello");

    const { name } = addingOrUpdatingLocationValidate.parse({
      name: formData.get("name"),
    });

    console.log("name is ", name);
    const companyId = (await getCompanyId()) as number;

    await prisma.locations.create({
      data: { name, companyId },
    });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function updatingLocation(formData: FormData) {
  try {
    const { name } = addingOrUpdatingLocationValidate.parse({
      name: formData.get("name"),
    });

    const locationId = Number(formData.get("locationId"));
    const locationIsSelected = formData.get("locationIsSelected");
    const currentUserAndSelectedLocation =
      await getCurrentUserAndSelectedLocation();

    await prisma.locations.update({
      data: { name },
      where: { id: locationId },
    });

    if (locationIsSelected) {
      await prisma.userAndSelectedLocation.update({
        data: { locationId },
        where: { id: currentUserAndSelectedLocation?.id },
      });
    } else {
      if (locationId === currentUserAndSelectedLocation?.locationId) {
        const locations = await getLocationsByCompanyId();
        const firstLocationId = locations[0].id;
        await prisma.userAndSelectedLocation.update({
          data: { locationId: firstLocationId },
          where: { id: currentUserAndSelectedLocation.id },
        });
      }
    }
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}

export async function deleteLocation(formData: FormData) {
  try {
    const locationId = Number(formData.get("locationId"));

    await prisma.userAndSelectedLocation.deleteMany({ where: { locationId } });
    await prisma.disableMenusAndLocations.deleteMany({ where: { locationId } });
    await prisma.disableMenuCategoriesAndLocations.deleteMany({
      where: { locationId },
    });
    await prisma.tables.deleteMany({ where: { locationId } });
    await prisma.locations.update({
      data: { isArchived: true },
      where: { id: locationId },
    });
  } catch (err) {
    return {
      error: "Something went wrong. Please contact our support team",
    };
  }
  return { error: null };
}
