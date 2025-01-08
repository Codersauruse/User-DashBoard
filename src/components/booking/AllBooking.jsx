import { useEffect, useState } from "react";
import { getAllBookings } from "../../service/bookingService";
import toast from "react-hot-toast";

import { allBookingState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import BusDetail from "./BusDetail";

export default function AllBooking() {
  const [bookings, setAllBookings] = useRecoilState(allBookingState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAllBookings() {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("Please log in :)");
          return;
        }

        const response = await getAllBookings(user.id);
        setAllBookings(response);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBookings();
  }, []);

  return (
    <div className="all-bookings  max-w-screen-lg mx-auto">
      {/* Loading State */}
      {isLoading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* No Bookings Message */}
      {!isLoading && bookings.length === 0 && (
        <p className="text-gray-500 text-center">No bookings available.</p>
      )}

      {/* Bookings List */}
      {!isLoading && bookings.length > 0 && (
        <div className="bookings-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="ticket border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg bg-white"
            >
              {/* Ticket Header */}
              <div className="ticket-header bg-blue-500 text-white p-4">
                <h3 className="font-bold text-lg">Booking ID: {booking._id}</h3>
                <p>
                  Status: {booking.isConfirmed ? "Confirmed" : "unConfirmed"}
                </p>
              </div>

              {/* Ticket Body */}
              <div className="ticket-body p-4">
                {/* Bus Details */}
                <BusDetail busId={booking.busId} />
                {/* Booking Details */}
                <div className="mt-4 text-sm">
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
