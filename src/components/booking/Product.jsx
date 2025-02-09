import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirmBooking, getOneBooking } from "../../service/bookingService";
import { getBus } from "../../service/busService";
import BusTicket from "./BusTicket";
import SeatingLayout from "./SeatingLayout";
import { useDateStore, useUserStore } from "../zustand/userStore";

export default function Product() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState({});
  const date = useDateStore((state) => state.date);
  const [numOfseats, setNumOfSeats] = useState(0);
  const User = useUserStore((state) => state.user);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  console.log(date);
  useEffect(() => {
    async function fetchBookingData() {
      try {
        if (!User) {
          toast.error("Please log in :)");
          return;
        }

        const response = await getOneBooking(id);
        const bus = await getBus(response.busId);
        setTicketData({
          ...bus,
          date,
          userName: User.username,
          bookingDetails: response,
        });
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookingData();
  }, [id]);

  const handleConfirmBooking = async (
    userId,
    busId,
    bookingId,
    numberOfSeats,
    selectedSeats,
    date
  ) => {
    try {
      const response = await confirmBooking(
        userId,
        busId,
        bookingId,
        numberOfSeats,
        selectedSeats,
        date
      );
      toast.success(response.message);
      setIsConfirmed(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">
          <span className="font-bold text-blue-600">
            Hello, Confirm your Bookings!
          </span>
        </p>
      </div>

      {/* Main Flex Container */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Seating Layout Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Choose your seats
          </h2>
          <SeatingLayout
            setNumOfSeats={setNumOfSeats}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
            busId={ticketData._id}
          />
        </div>

        {/* Bus Ticket Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <BusTicket ticketData={ticketData} />
        </div>
      </div>
      <div className="payment-buttons mt-6 flex justify-center">
        {!isConfirmed ? (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={() =>
              handleConfirmBooking(
                User.id,
                ticketData._id,
                id,
                numOfseats,
                selectedSeats,
                date
              )
            }
          >
            Confirm Booking
          </button>
        ) : (
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
