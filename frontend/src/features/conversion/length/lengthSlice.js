import { createSlice } from "@reduxjs/toolkit";

const lengthSlice = createSlice({
  name: "length",
  initialState: {
    selectedUnitPair: "metersToKilometers", // Default unit pair
    conversionRates: {
      metersToKilometers: {
        convert: (meters) => meters / 1000,
        name: "Meters to Kilometers",
      },
      kilometersToMeters: {
        convert: (kilometers) => kilometers * 1000,
        name: "Kilometers to Meters",
      },
      milesToKilometers: {
        convert: (miles) => miles * 1.60934,
        name: "Miles to Kilometers",
      },
      kilometersToMiles: {
        convert: (kilometers) => kilometers / 1.60934,
        name: "Kilometers to Miles",
      },
    },
  },
  reducers: {
    setSelectedUnitPair(state, action) {
      state.selectedUnitPair = action.payload;
    },
  },
});

export const { setSelectedUnitPair } = lengthSlice.actions;

export default lengthSlice.reducer;
