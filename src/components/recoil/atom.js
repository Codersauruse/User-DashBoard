import { atom } from "recoil";

const expandedState = atom({
  key: "expandedState", // Unique ID
  default: false,
});

const activeState = atom({
  key: "activeState",
  default: true,
});

const timetableState = atom({
  key: "timetableState",
  default: [],
});

const tempTimetableState = atom({
  key: "tempTimetableState",
  default: [],
});

const allBookingState = atom({
  key: "allBookingState",
  default:[],

});


export { expandedState, activeState, timetableState, tempTimetableState,allBookingState };
