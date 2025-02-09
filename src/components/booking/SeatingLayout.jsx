import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllReservedSeats } from "../../service/seatService";

export default function SeatingLayout({
  setNumOfSeats,
  setSelectedSeats,
  selectedSeats,
  busId,
}) {
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    async function fetchAllReservedSeats() {
      try {
        const response = await getAllReservedSeats(busId);
        console.log(response);

        setReservedSeats(response || []); // Ensure response is set properly
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      }
    }

    if (busId) {
      fetchAllReservedSeats();
    }
  }, [busId]); // Dependency added for re-fetching if busId changes

  const numbers = Array.from({ length: 50 }, (_, index) => index + 1);

  const handleSeatClick = (num) => {
    if (reservedSeats.includes(num)) return;

    setSelectedSeats((prev) => {
      const newSelectedSeats = prev.includes(num)
        ? prev.filter((seat) => seat !== num)
        : [...prev, num];

      setNumOfSeats(newSelectedSeats.length); // Correctly updating selected seat count
      return newSelectedSeats;
    });
  };

  return (
    <div className="seating-layout p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Indicators */}
      <div className="indicators flex gap-4 mb-6">
        <Indicator color="bg-gray-300" label="Available" />
        <Indicator color="bg-purple-500" label="Selected" />
        <Indicator color="bg-gray-500" label="Reserved" />
      </div>

      {/* Seat Layout */}
      <div className="seat-layout bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-4 gap-2">
          {numbers.map((num) => (
            <Seat
              key={num}
              num={num}
              isReserved={reservedSeats.includes(num)}
              isSelected={selectedSeats.includes(num)}
              onClick={() => handleSeatClick(num)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Indicator Component
const Indicator = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <button type="button" className={`w-4 h-4 ${color} rounded-full`}></button>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

// Seat Component
const Seat = ({ num, isReserved, isSelected, onClick }) => {
  let seatClass =
    "seat flex items-center justify-center h-12 w-12 rounded-lg cursor-pointer";

  if (isReserved) {
    seatClass += " bg-gray-500 text-white cursor-not-allowed";
  } else if (isSelected) {
    seatClass += " bg-purple-500 text-white";
  } else {
    seatClass += " bg-gray-300 text-gray-700 hover:bg-gray-400";
  }

  return (
    <div className={seatClass} onClick={!isReserved ? onClick : undefined}>
      <p>{num}</p>
    </div>
  );
};

// PropTypes Validation
Seat.propTypes = {
  num: PropTypes.number.isRequired,
  isReserved: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Indicator.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

SeatingLayout.propTypes = {
  setNumOfSeats: PropTypes.func.isRequired,
  setSelectedSeats: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  busId: PropTypes.string.isRequired,
};
