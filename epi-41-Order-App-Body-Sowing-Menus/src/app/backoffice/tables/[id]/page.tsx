import { prisma } from "@/libs/prisma";
import { getLocationsByCompanyId } from "@/libs/action";
import { deleteTable, updatingTable } from "../action";
import QrCodeImage from "@/components/QrCodeImage";
import UpdatingTablePage from "./UpdatingTablePage";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingTable({ params }: Props) {
  const id = Number(params.id);

  const tableToBeUpdatedOrDeleted = await prisma.tables.findFirst({
    where: { id },
  });

  if (!tableToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <UpdatingTablePage
      tableToBeUpdatedOrDeleted={tableToBeUpdatedOrDeleted}
      id={id}
    />
  );
}
