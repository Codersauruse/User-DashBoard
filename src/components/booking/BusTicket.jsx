import PropTypes from "prop-types";
import BusImg from "../../assets/bus.webp";

// Helper function to generate a random ticket ID
const generateTicketId = () => {
  return `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const BusTicket = ({ ticketData }) => {
  return (
    <div className="max-w-3xl mx-auto my-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-indigo-100 to-gray-50 text-gray-800">
      {/* Ticket Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-semibold tracking-wide">
          {ticketData.busName}
        </h2>
        <div className="text-3xl">🚌</div>
      </div>

      {/* Ticket Body */}
      <div className="flex flex-wrap px-6 py-4">
        {/* Left Section: Journey & Bus Info */}
        <div className="w-full sm:w-1/2 pr-6 mb-6 sm:mb-0">
          <div className="mb-4">
            <p className="text-gray-600 font-medium">From:</p>
            <p className="text-gray-900 font-semibold text-lg">Matara</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">To:</p>
            <p className="text-gray-900 font-semibold text-lg">
              {ticketData.destination}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src={BusImg} // Replace with the actual path to the downloaded image
              alt="Bus Illustration"
              className="max-w-full h-[200px] rounded-lg shadow-md" // Set the height to 200px
            />
          </div>
        </div>

        {/* Right Section: Passenger & Ticket Info */}
        <div className="w-full sm:w-1/2 pl-6 border-l border-gray-300">
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Name:</p>
            <p className="text-gray-900 font-semibold text-lg">shehan</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Date:</p>
            <p className="text-gray-900">{ticketData.date}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Time:</p>
            <p className="text-gray-900">
              {ticketData.arrivalTime} - {ticketData.departureTime}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Number of Seats:</p>
            <p className="text-gray-900 font-semibold text-lg">{1}</p>
          </div>
        </div>
      </div>

      {/* Ticket Footer */}
      <div className="bg-gray-200 text-center py-4 rounded-b-lg">
        <p className="text-gray-600 text-xs">
          Ticket ID: <span className="font-semibold">{generateTicketId()}</span>
        </p>
        <p className="text-blue-600 text-lg font-bold mt-2">
          fair : ${ticketData.price}
        </p>
      </div>
    </div>
  );
};

// PropTypes Validation
BusTicket.propTypes = {
  ticketData: PropTypes.shape({
    busName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default BusTicket;
