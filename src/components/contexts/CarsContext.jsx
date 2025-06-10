import { createContext } from "react";

export const CarsContext = createContext({
  fetchCars: () => [],
  addCar: () => {},
  updateCar: () => {},
  deleteCar: () => {},
  loaded: false,
  loading: false,
  error: null,
  cars: [],
});
