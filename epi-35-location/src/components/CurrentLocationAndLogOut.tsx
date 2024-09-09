"use client";

import { getLocationsByCompanyId, getTablesByLocationId } from "@/libs/action";
import { Locations, Tables } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  locations: Locations[];
}
export default function CurrentLocationAndLogOut({ locations }: Props) {
  const [currentLocation, setCurrentLocation] = useState<Locations>();

  useEffect(() => {
    handleGetCurrentLocation();
  }, [locations]);

  const handleGetCurrentLocation = async () => {
    if (!localStorage) return null;

    const currentLocationId = localStorage.getItem("currentLocationId");

    if (!currentLocationId) {
      const firstLocation = locations[0];
      setCurrentLocation(firstLocation);
      localStorage.setItem("currentLocationId", String(firstLocation.id));
    } else {
      const currentLocation = locations.find(
        (location) => location.id === Number(currentLocationId)
      );
      setCurrentLocation(currentLocation);
    }
  };

  return (
    <>
      <h3>{currentLocation?.name}</h3>
      <h3 style={{ cursor: "pointer" }} onClick={() => signOut()}>
        Log Out
      </h3>
    </>
  );
}
