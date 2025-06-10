import { useContext } from "react";

import { CarsContext } from "./CarsContext";

export default function useCars() {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error("useCars must be used within a CarsProvider");
  }
  return context;
}