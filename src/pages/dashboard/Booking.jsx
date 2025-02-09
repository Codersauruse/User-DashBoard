import { useState } from "react";
import AllBooking from "../../components/booking/AllBooking";
import Unconfirmed from "../../components/booking/Unconfirmed.jsx";
import Confirmed from "../../components/booking/Confirmed.jsx";

export default function Booking() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bookings max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <div className="title text-3xl font-bold text-gray-800 mb-8 text-center">
        My Bookings
      </div>

      {/* Tabs */}
      <div className="bookingTabs flex flex-wrap justify-center gap-6 border-b border-gray-300 pb-4 mb-8">
        {["All", "Unconfirmed", "Confirmed", "Cancelled"].map((tab) => (
          <div
            key={tab}
            className={`cursor-pointer px-6 py-2 text-lg font-medium transition-all duration-300
              ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Pages Content */}
      <div className="pages">
        {/* All Bookings */}
        {activeTab === "All" && (
          <div className="flex">
            <AllBooking />
          </div>
        )}

        {/* Unconfirmed Bookings */}
        {activeTab === "Unconfirmed" && (
          <div className="flex">
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mt-2">
                Unconfirmed bookings will be displayed here.
              </p>
              <div className="text-lg font-semibold text-yellow-700">
                <Unconfirmed />
              </div>
            </div>
          </div>
        )}

        {/* Confirmed Bookings */}
        {activeTab === "Confirmed" && (
          <div className="flex">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-green-700">
                Confirmed bookings will be displayed here.
              </p>
              <div className="text-sm text-gray-600 mt-2"></div>
              <Confirmed />
            </div>
          </div>
        )}

        {/* Cancelled Bookings */}
        {activeTab === "Cancelled" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-red-700">
                Cancelled Bookings
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Cancelled bookings will be displayed here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
