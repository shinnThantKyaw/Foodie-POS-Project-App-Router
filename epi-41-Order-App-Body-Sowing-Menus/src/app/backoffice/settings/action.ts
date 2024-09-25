"use server";

import { catchTheError, getCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
});
export async function getCompany() {
  const companyId = await getCompanyId();
  return await prisma.company.findFirst({ where: { id: companyId } });
}

export async function updatingCompany(formDate: FormData) {
  try {
    const { name } = FormSchema.parse({
      name: formDate.get("name"),
    });

    const id = Number(formDate.get("id"));

    await prisma.company.update({ data: { name }, where: { id } });
  } catch (err) {
    return catchTheError(err);
  }
  return { error: null };
}
