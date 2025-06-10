import { useEffect } from "react";
import useCars from "../components/contexts/CarsHook";

function Cars() {
  const { loading, error, cars, fetchCars, deleteCar} = useCars()
  console.log(cars);

  useEffect(() => {
    fetchCars();
  }, [fetchCars])

  if(loading) return <p>Loading...</p>;

  if(error) return <p>{error}</p>;

  return (
    <>
  <ul>
    {cars.map(({name, _id}, i) => (<li key={i}>{name}<button onClick={() => deleteCar(_id)}>X</button></li>))}
  </ul>
  </>)
}

export default Cars;
