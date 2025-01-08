import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeState, tempTimetableState } from "../../components/recoil/atom";
import { Music, MapPin, Film, SlidersHorizontal, Wifi } from "lucide-react";
import PropTypes from "prop-types";
import { SearchBar } from "../index";
import { addToBooking } from "../../service/bookingService.js";
import toast from "react-hot-toast";

export default function Timetable() {
  const timeTable = useRecoilValue(tempTimetableState);
  const [isActive, setActive] = useRecoilState(activeState);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const closingTime = new Date();
      closingTime.setHours(23, 0, 0, 0);

      if (now > closingTime) {
        setActive(false);
      }
    };

    checkTime();
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Timetable</h1>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeTable.map((journey) => (
          <Journey key={journey.id} journey={journey} isActive={isActive} />
        ))}
      </div>
    </div>
  );
}

const Journey = ({ journey, isActive }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const bookTicket = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Please log in to book a ticket.");
      return;
    }
    const busId = event.currentTarget.id;
    const userId = user.id;

    console.log("Bus ID:", busId);
    console.log("User ID:", userId);

    if (isActive && journey.availableSeats > 0) {
      try {
        const booking = await addToBooking(userId, busId, false);
        console.log(booking);
        toast.success("Bus is Added to My Booking", {
          duration: 3000,
          icon: "😃",
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col space-y-6 bg-gradient-to-r from-white to-gray-50 w-80 mx-auto">
      <div className="text-lg font-bold text-gray-800">
        <p>{journey.busName}</p>
        <p className="text-sm text-gray-500">
          Route Number: {Math.floor(journey.availableSeats * Math.random())}
        </p>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-medium">
          <span className="text-gray-500">Route:</span> Matara to{" "}
          <span className="text-blue-600">{journey.destination}</span>
        </p>
        <p>
          <span className="text-gray-500">Time:</span> {journey.arrivalTime} -{" "}
          {journey.departureTime}
        </p>
      </div>
      <div className="flex items-center justify-around text-gray-600">
        <Music className="w-6 h-6 text-blue-500 hover:text-blue-700 transition" />
        <MapPin className="w-6 h-6 text-green-500 hover:text-green-700 transition" />
        <Film className="w-6 h-6 text-red-500 hover:text-red-700 transition" />
        <SlidersHorizontal className="w-6 h-6 text-yellow-500 hover:text-yellow-700 transition" />
        <Wifi className="w-6 h-6 text-indigo-500 hover:text-indigo-700 transition" />
      </div>
      <div className="text-sm text-blue-600 cursor-pointer underline hover:text-blue-800 transition">
        View Cancellation Policy
      </div>
      <div className="space-y-2">
        <p className="font-medium text-gray-800">
          Price:{" "}
          <span className="text-green-600">
            ${journey.price ? journey.price.toFixed(2) : "N/A"}
          </span>
        </p>
        <p className="font-medium text-gray-800">
          Available Seats:{" "}
          <span className="text-blue-600">{journey.availableSeats}</span>
        </p>
        <button
          key={journey._id}
          id={journey._id}
          type="button"
          className={`w-full py-2 px-4 rounded-lg font-semibold shadow-md ${
            isActive && journey.availableSeats > 0
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isActive || journey.availableSeats <= 0}
          onClick={bookTicket}
        >
          {isActive && journey.availableSeats > 0
            ? "Add to My Bookings"
            : "Time is up..."}
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
Journey.propTypes = {
  journey: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Change 'id' to '_id'
    busName: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    availableSeats: PropTypes.number.isRequired,
    isWorking: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};
