import { Box } from "@mui/material";
import { Company } from "@prisma/client";
import Image from "next/image";

interface Props {
  company: Company | null;
}
export default function OrderAppHeader({ company }: Props) {
  if (!company) return null;
  return (
    <Box>
      <Image
        alt="headerImage"
        src="order-app-header.svg"
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
          top: "30px",
          color: "#023047",
        }}
      >
        <h1>{company.name}</h1>
        <h4 style={{ fontStyle: "italic", color: "#023955" }}>
          {company.name}
        </h4>
      </Box>
    </Box>
  );
}
