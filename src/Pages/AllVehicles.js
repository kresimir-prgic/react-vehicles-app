import { useState, useEffect } from 'react';

import VehicleList from "../Components/VehicleList";

function AllVehiclesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVehicles, setLoadedVehicles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://retoolapi.dev/SaKAaw/vehicles')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const vehiclesData = data;
        // console.log(vehiclesData);
        setIsLoading(false);
        setLoadedVehicles(vehiclesData);
      })
  }, []);

  if (isLoading) {
    return (
      <section>Loading Vehicles...</section>
    );
  }
  return (
    <section>
      <h1>All Vehicles</h1>
      <VehicleList vehicles={loadedVehicles} />
    </section>
  );
}

export default AllVehiclesPage;
