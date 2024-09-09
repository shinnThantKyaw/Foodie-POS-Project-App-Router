import { Box } from "@mui/material";
import CurrentLocationAndLogOut from "../CurrentLocationAndLogOut";
import { prisma } from "@/libs/prisma";
import { getLocationsByCompanyId } from "@/libs/action";

export default async function TopBar() {
  const locations = await getLocationsByCompanyId();
  return (
    <Box
      sx={{
        bgcolor: "#021e2c",
        color: "#8ecae6",
        height: "13vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "17px",
        fontSize: "20px",
      }}
    >
      <h3>Foodie POS</h3>
      <CurrentLocationAndLogOut locations={locations} />
    </Box>
  );
}
