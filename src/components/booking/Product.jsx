import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOneBooking } from "../../service/bookingService";

export default function Product() {
  const [booking, setBooking] = useState({});
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchOneBooking() {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("Please log in :)");
          return;
        }

        const response = await getOneBooking(id);
        setBooking(response);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOneBooking();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">
          Hello, I am a product. My id is{" "}
          <span className="font-bold text-blue-600">{id}</span>
        </p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row justify-between gap-8">
        {/* Booking Info */}
        <div className="booking w-full lg:w-1/2">
          <div className="bookingInfo bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Booking Information
            </h2>
            <p className="text-gray-600">
              Details about the booking will be displayed here.
            </p>
          </div>
        </div>

        {/* Seating Plan */}
        <div className="seatingPlan w-full lg:w-1/2">
          <div className="title mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Seating Plan
            </h2>
          </div>
          <div className="seats bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">
              The seating plan for this product will be shown here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
