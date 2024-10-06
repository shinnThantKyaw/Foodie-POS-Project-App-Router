import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Company } from "@prisma/client";
import Image from "next/image";
import CartIcon from "./CartIcon";

interface Props {
  company: Company | null;
  headerImageUrl?: string;
  tableId: number;
}
export default function OrderAppHeader({
  company,
  headerImageUrl,
  tableId,
}: Props) {
  if (!company) return null;
  return (
    <Box>
      <Image
        alt="headerImage"
        src="/order-app-header.svg"
        height={0}
        width={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: headerImageUrl ? "15px" : "30px",
          color: "#fefae0",
        }}
      >
        {headerImageUrl ? (
          <img
            src={headerImageUrl}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "150px",
            }}
          />
        ) : (
          <>
            {" "}
            <h1>{company.name}</h1>
            <h5 style={{ fontStyle: "italic" }}>{company.name}</h5>
          </>
        )}
      </Box>
      <CartIcon tableId={tableId} />
    </Box>
  );
}
