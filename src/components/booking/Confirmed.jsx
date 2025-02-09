import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allBookingState } from "../recoil/atom";
import BusDetail from "./BusDetail";
import { useNavigate } from "react-router";

export default function Confirmed() {
  const navigate = useNavigate();
  const [BookingList, setBookingList] = useRecoilState(allBookingState);
  const [ConfirmedBookingList, setConfirmedBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (BookingList) {
      setConfirmedBookingList(
        BookingList.filter((booking) => booking.isConfirmed)
      );
      setIsLoading(false);
    }
  }, [BookingList]);

  return (
    <div className="confirmed-bookings max-w-screen-lg mx-auto">
      {/* Loading State */}
      {isLoading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* No Bookings Message */}
      {!isLoading && ConfirmedBookingList.length === 0 && (
        <p className="text-gray-500 text-center">
          No confirmed bookings available.
        </p>
      )}

      {/* Bookings List */}
      {!isLoading && ConfirmedBookingList.length > 0 && (
        <div className="bookings-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ConfirmedBookingList.map((booking) => (
            <div
              key={booking._id}
              className="ticket border-2 border-green-600 rounded-lg overflow-hidden shadow-lg bg-green-100"
            >
              {/* Ticket Header */}
              <div className="ticket-header bg-green-600 text-white p-4">
                <h3 className="font-bold text-lg">Booking ID: {booking._id}</h3>
                <p>
                  Status: <span className="font-semibold">Confirmed</span>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
