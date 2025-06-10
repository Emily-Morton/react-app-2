
import { useContext } from "react";
import { CarsContext } from "../components/contexts/CarsContext";

function Cars() {
  const {cars} = useContext(CarsContext)
  console.log(cars);
  return (
  <ul>
    {cars.map(({name}, i) => (<li key={i}>{name}</li>))}
  </ul>)
}

export default Cars;
