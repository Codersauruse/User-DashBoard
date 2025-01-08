import { getBus } from "../../service/busService";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";


function BusDetail({ busId }) {
  const [bus, setBus] = useState(null);

  useEffect(() => {
    async function fetchBus() {
      try {
        const response = await getBus(busId);
        setBus(response);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    }

    fetchBus();
  }, [busId]);

  return (
    <div className="bus-detail mt-2">
      {bus ? (
        <div className="bus-info">
          <p>
            <span className="font-bold">Bus Name:</span> {bus.busName}
          </p>
          <p>
            <span className="font-bold">Arrival:</span> {bus.arrivalTime}
          </p>
          <p>
            <span className="font-bold">Departure :</span> {bus.departureTime}
          </p>
          <p>
            <span className="font-bold">Destination :</span> {bus.destination}
          </p>
          <p>
            <span className="font-bold">Available Seats:</span>{" "}
            {bus.availableSeats}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading bus details...</p>
      )}
    </div>
  );
}

BusDetail.propTypes = {
  busId: PropTypes.string.isRequired, // Ensures busId is a string and is required
};

export default BusDetail;
