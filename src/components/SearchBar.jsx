import { useRecoilState } from "recoil";
import { tempTimetableState, timetableState } from "./recoil/atom";
import { useEffect, useState } from "react";
import { getAllBuses } from "../service/busService";
import { useDateStore } from "./zustand/userStore";
import DatePicker from "react-datepicker"; // Import React Date Picker
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import { format } from "date-fns";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [timetable, setTimeTable] = useRecoilState(timetableState);
  const [filteredTimetable, setFilteredTimetable] = useState([]);
  const [tempTimeTable, setTempTimeTable] = useRecoilState(tempTimetableState);
  const date = useDateStore((state) => state.date);
  const setDate = useDateStore((state) => state.setDate);
  useEffect(() => {
    async function initialize() {
      try {
        const selectedDate = date
          ? format(date, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd");
        console.log(selectedDate);
        setDate(selectedDate);
        const response = await getAllBuses("", selectedDate); // Fetch buses (all or filtered)
        setTimeTable(response); // Assuming the response is already data
        console.log(response);
        if (tempTimeTable.length === 0) {
          setTempTimeTable(response);
        }
      } catch (error) {
        console.error("Error fetching timetable:", error.message);
      }
    }

    initialize(); // Invoke the function
  }, [date]); // Dependency array ensures this runs only once after the component mounts

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(location);
  };

  const filterByDestination = (event) => {
    event.preventDefault();

    if (location != "") {
      console.log(location);

      const filtered = timetable.filter(
        (journey) => journey.destination.toLowerCase() == location.toLowerCase()
      );
      if (filtered.length > 0) {
        setFilteredTimetable(filtered);
        setTempTimeTable(filtered);
      } else {
        setTempTimeTable([]);
        alert("No journeys found for the given location.");
      }
    } else {
      setFilteredTimetable(timetable);
      setTempTimeTable(timetable);
    }
  };

  const filterByFactor = (factor) => {
    const tempArr = filteredTimetable
      .slice()
      .sort((a, b) => a[factor] - b[factor]);
    setTempTimeTable(tempArr);
  };

  const filterby = ["price", "departureTime", "arrivalTime", "availableSeats"];

  return (
    <div className="flex justify-center items-start mb-5 py-10">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          {/* Search Input */}
          <div className="w-full flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              name="searchbar"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search by location and date"
              value={location}
              onChange={handleChange}
            />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="Select date"
            />
            <button
              type="button"
              name="search-button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={filterByDestination}
            >
              Search
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filterby.map((factor) => (
              <button
                key={factor}
                name={factor}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => filterByFactor(factor)}
              >
                {factor.charAt(0).toUpperCase() + factor.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
/*
    id: "bc7d5b6ef76c42d8ac7fa708",
    busName: "Luxury 120",
    arrivalTime: "14:00",
    departureTime: "15:00",
    destination: "Kandy",
    availableSeats: 25,
    isWorking: true,
    date: "2024-12-30",
    price: 30.0, */
