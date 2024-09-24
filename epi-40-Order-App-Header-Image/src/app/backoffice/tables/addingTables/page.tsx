import { addingTable } from "../action";
import { getCurrentLocationId } from "@/libs/action";
import AddingTablesPage from "./AddingTablesPage";

export default async function AddingTables() {
  const currentLocationId = await getCurrentLocationId();
  return <AddingTablesPage currentLocationId={currentLocationId} />;
}
