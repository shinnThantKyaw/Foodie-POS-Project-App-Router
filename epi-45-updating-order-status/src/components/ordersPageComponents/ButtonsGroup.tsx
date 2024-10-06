import { Box, Button, ButtonGroup } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Link from "next/link";

interface Props {
  status: ORDERSTATUS;
}
export default function ButtonsGroup({ status }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <Link href={"/backoffice/orders/pending"}>
            <Button
              variant={
                status === ORDERSTATUS.PENDING ? "contained" : "outlined"
              }
              sx={
                status === ORDERSTATUS.PENDING
                  ? {
                      color: "#8ecae6",
                      bgcolor: "#023047",
                      ":hover": { bgcolor: "#8ecae6", color: "#023047" },
                    }
                  : {
                      color: "#023047",
                      borderColor: "#023047",
                      ":hover": { borderColor: "#023047", color: "#8ecae6" },
                    }
              }
            >
              PENDING
            </Button>
          </Link>
          <Link href={"/backoffice/orders/cooking"}>
            {" "}
            <Button
              variant={
                status === ORDERSTATUS.COOKING ? "contained" : "outlined"
              }
              sx={
                status === ORDERSTATUS.COOKING
                  ? {
                      color: "#8ecae6",
                      bgcolor: "#023047",
                      ":hover": { bgcolor: "#8ecae6", color: "#023047" },
                    }
                  : {
                      color: "#023047",
                      borderColor: "#023047",
                      ":hover": { borderColor: "#023047", color: "#8ecae6" },
                    }
              }
            >
              COOKING
            </Button>
          </Link>
          <Link href={"/backoffice/orders/complete"}>
            {" "}
            <Button
              variant={
                status === ORDERSTATUS.COMPLETE ? "contained" : "outlined"
              }
              sx={
                status === ORDERSTATUS.COMPLETE
                  ? {
                      color: "#8ecae6",
                      bgcolor: "#023047",
                      ":hover": { bgcolor: "#8ecae6", color: "#023047" },
                    }
                  : {
                      color: "#023047",
                      borderColor: "#023047",
                      ":hover": { borderColor: "#023047", color: "#8ecae6" },
                    }
              }
            >
              COMPLETE
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
