import OrderAppHeader from "@/components/orderAppComponents/OrderAppHeader";
import { Box } from "@mui/material";
import { getCompanyByTableId, getMenuCategoriesByTableId } from "./action";
import OrderAppBody from "@/components/orderAppComponents/OrderAppBody";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export default async function OrderPage({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);
  const company = await getCompanyByTableId(tableId);
  const menuCategories = await getMenuCategoriesByTableId(tableId);

  console.log("menuCategories are", menuCategories);
  return (
    <Box>
      <OrderAppHeader company={company} />
      <OrderAppBody menuCategories={menuCategories} tableId={tableId} />
    </Box>
  );
}
