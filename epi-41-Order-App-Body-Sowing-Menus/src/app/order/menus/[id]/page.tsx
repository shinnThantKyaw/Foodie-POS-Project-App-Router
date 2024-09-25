import { Box } from "@mui/material";
import { getCompanyByTableId } from "../../action";
import { prisma } from "@/libs/prisma";
import OrderAppHeader from "@/components/orderAppComponents/OrderAppHeader";
import Image from "next/image";

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

  const menu = await prisma.menus.findFirst({ where: { id: menuId } });

  if (!company) return null;
  return (
    <Box>
      <OrderAppHeader company={company} headerImageUrl={menu?.imageUrl} />
    </Box>
  );
}
