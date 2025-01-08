import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allBookingState } from "../recoil/atom";
import BusDetail from "./BusDetail"; // Ensure this is the correct import for BusDetail
import { useNavigate } from "react-router";

export default function Unconfirmed() {
  const navigate = useNavigate();
  const [BookingList, setBookingList] = useRecoilState(allBookingState);
  const [unConfirmedBookingList, setUnConfirmedBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (BookingList) {
      setUnConfirmedBookingList(
        BookingList.filter((booking) => !booking.isConfirmed)
      );
      setIsLoading(false); // Stop loading once bookings are filtered
    }
  }, [BookingList]);

  function handleClick(event) {
    event.preventDefault();
    const id = event.currentTarget.id;
    navigate(`/dashboard/product/${id}`);
  }

  return (
    <div className="unconfirmed-bookings max-w-screen-lg mx-auto">
      {/* Loading State */}
      {isLoading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* No Bookings Message */}
      {!isLoading && unConfirmedBookingList.length === 0 && (
        <p className="text-gray-500 text-center">
          No unconfirmed bookings available.
        </p>
      )}

      {/* Bookings List */}
      {!isLoading && unConfirmedBookingList.length > 0 && (
        <div className="bookings-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unConfirmedBookingList.map((booking) => (
            <div
              key={booking._id}
              className="ticket border-2 border-yellow-600 rounded-lg overflow-hidden shadow-lg bg-yellow-100"
            >
              {/* Ticket Header */}
              <div className="ticket-header bg-yellow-600 text-black p-4">
                <h3 className="font-bold text-lg">Booking ID: {booking._id}</h3>
                <p>
                  Status: {booking.isConfirmed ? "Confirmed" : "Unconfirmed"}
                </p>
              </div>
              {/* Ticket Body */}
              <div className="ticket-body p-4">
                {/* Bus Details */}
                <BusDetail busId={booking.busId} />
                {/* Booking Details */}
                <div className="mt-4 text-sm text-black">
                  <p>
                    <span className="font-bold">Date:</span> {booking.date}
                  </p>
                  <p>
                    <span className="font-bold">Seats Booked:</span>{" "}
                    {booking.numberOfSeatsBooked > 0
                      ? booking.numberOfSeatsBooked
                      : 0}
                  </p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="ticket-actions flex justify-between p-4">
                <button
                  id={booking._id}
                  onClick={handleClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
                <button
                  id="booking._id"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
