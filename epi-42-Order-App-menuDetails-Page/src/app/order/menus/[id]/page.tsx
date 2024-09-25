import { Box } from "@mui/material";
import { getCompanyByTableId } from "../../action";
import { prisma } from "@/libs/prisma";
import OrderAppHeader from "@/components/orderAppComponents/OrderAppHeader";
import Image from "next/image";
import MenuDetailsPageBody from "@/components/orderAppComponents/MenuDetailsPageBody";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tableId: string;
  };
}
export default async function MenuDetailsPage({ params, searchParams }: Props) {
  const menuId = Number(params.id);
  const tableId = Number(searchParams.tableId);

  const company = await getCompanyByTableId(tableId);

  const menu = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { addonCategoriesAndMenus: true },
  });

  const addonCategoryIdsByMenu = menu?.addonCategoriesAndMenus.map(
    (item) => item.addonCategoryId
  );

  const addonCategoriesByMenu = await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryIdsByMenu } },
  });

  const addonsByMenu = await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIdsByMenu } },
  });

  if (!company) return null;
  return (
    <Box>
      <OrderAppHeader company={company} headerImageUrl={menu?.imageUrl} />
      <MenuDetailsPageBody
        addonCategoriesByMenu={addonCategoriesByMenu}
        addonsByMenu={addonsByMenu}
      />
    </Box>
  );
}
