"use client";

import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}
export default function QuantitySelector({ quantity, setQuantity }: Props) {
  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleDecreaseQuantity = () => {
    const newQuantity = quantity === 1 ? quantity : quantity - 1;
    setQuantity(newQuantity);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleDecreaseQuantity}>
        <RemoveCircle color="primary" />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={handleIncreaseQuantity}>
        <AddCircle color="primary" />
      </IconButton>
    </Box>
  );
}
