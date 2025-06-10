import { useState, useEffect, useCallback } from "react";
import CarDisplay from "../components/CarDisplay";

function CarsComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [cars, setCars] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    // setLoaded(false);
    try {
      const resp = await fetch(
        "https://carsapp-production.up.railway.app/api/v1/cars"
      );
      if (!resp.ok) throw resp;
      const data = await resp.json();
      setCars(data);
    } catch (err) {
      console.log("error", err);
      setErr(err);
    } finally {
      setIsLoading(false);
      setLoaded(true);
    }
  }, [setCars]);

  useEffect(() => {
    if (!loaded) {
      getData();
    }
  }, [cars, getData, loaded]);

  if (isLoading) return <p>Loading</p>;

  if (err) return <p>Error {err.message}</p>;

  if (!cars.length) return <p>You have no cars</p>;

  return (
    <div>
      <ul>
        {cars.map(({ name, bhp, _id }) => (
          <CarDisplay key={_id} name={name} bhp={bhp} />
        ))}
      </ul>
    </div>
  );
}

export default CarsComponent;