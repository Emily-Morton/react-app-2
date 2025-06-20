import {  useState, useCallback } from "react";
import { CarsContext } from "./CarsContext";

const CARS_API_ENDPOINT =
  "https://carsapp-production.up.railway.app/api/v1/cars";
const STORAGE_KEY = "cars";


export const CarsProvider = (props) => {
  const [cars, setCars] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; // get from localStorage initially
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(CARS_API_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setCars(data);

      // console.log('cars from context', cars);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addCar = useCallback(async (dataFromForm) => {
    console.log("about to add", dataFromForm);
    const newCarName = dataFromForm.name;
    try {
      const response = await fetch(CARS_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(dataFromForm),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedCar = await response.json();
      console.log("got data", savedCar);
      const newCars = [...cars, savedCar];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCars));
      setCars(newCars);
      console.log(`Saved ${savedCar.name}`);
    } catch (err) {
      console.log(err);
      console.error(`Could not create: ${newCarName || "car"} ${err.statusText || err.message}`);
    }
  }, [cars]);

  const updateCar = useCallback(async (id, dataFromForm) => {
    // console.log("updating", id, dataFromForm);

    let updatedCar = null;

    // Get index
    const index = cars.findIndex((car) => car._id === id);
    console.log(index);
    if (index === -1) throw new Error(`Car with index ${id} not found`);

    // Get actual car
    const oldCar = cars[index];
    console.log("oldCar", oldCar);

    // Send the differences, not the whole update
    const updates = {};

    for (const key of Object.keys(oldCar)) {
      if (key === "_id") continue;
      if (oldCar[key] !== dataFromForm[key]) {
        updates[key] = dataFromForm[key];
      }
    }

    try {
      const response = await fetch(`${CARS_API_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw response;
      }

      // Merge with dataFromForm
      updatedCar = {
        ...oldCar,
        ...dataFromForm, // order here is important for the override!!
      };

      console.log("updatedCar", updatedCar);

      // recreate the cars array
      const updatedCars = [
        ...cars.slice(0, index),
        updatedCar,
        ...cars.slice(index + 1),
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars)); // save to localStorage

      setCars(updatedCars); // save the update
      console.log(`Updated ${updatedCar.name}`);
    } catch (err) {
      console.log(err);
      console.error(`Error updating ${oldCar.name}: ${err.statusText || err.message}`);
    }
  }, [cars]);

  const deleteCar = useCallback(async (id) => {
    // Get index
    const index = cars.findIndex((car) => car._id === id);
    const deletedCar = cars[index];

    try {
      const response = await fetch(`${CARS_API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (response.status !== 204) {
        throw response;
      }

      // recreate the cars array without that car
      const updatedCars = [...cars.slice(0, index), ...cars.slice(index + 1)];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));

      setCars(updatedCars);

      console.log(`Deleted ${deletedCar.name}`);
    } catch (err) {
      console.error(`Error: Failed to delete ${deletedCar.name}: ${err.statusText || err.message}`);
    }
  }, [cars]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        fetchCars,
        addCar,
        updateCar,
        deleteCar,
      }}
    >
      {props.children}
    </CarsContext.Provider>
  );
};