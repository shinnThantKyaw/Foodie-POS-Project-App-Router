import { prisma } from "@/libs/prisma";
import { getCompany, updatingCompany } from "./action";
import UpdatingSettingPage from "./UpdatingSettingPage";

export default async function uptaingCompany() {
  const company = await getCompany();
  return <UpdatingSettingPage company={company} />;
}
