import { getCompanyId } from "@/libs/action";
import AddingMenuCategoryPage from "./AddingMenuCategoryPage";

export default async function addingMenuCategories() {
  const companyId = await getCompanyId();
  return <AddingMenuCategoryPage companyId={Number(companyId)} />;
}
