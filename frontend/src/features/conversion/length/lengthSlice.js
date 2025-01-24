import { createSlice } from "@reduxjs/toolkit";

const lengthSlice = createSlice({
  name: "length",
  initialState: {
    selectedUnitPair: "metersToKilometers", // Default unit pair
    conversionRates: {
      metersToKilometers: {
        convert: (meters) => meters / 1000,
        fromUnitName: "Meter",
        toUnitName: "Kilometer",
        name: "Meters to Kilometers",
      },
      kilometersToMeters: {
        convert: (kilometers) => kilometers * 1000,
        fromUnitName: "Kilometer",
        toUnitName: "Meter",
        name: "Kilometers to Meters",
      },
      milesToKilometers: {
        convert: (miles) => miles * 1.60934,
        fromUnitName: "Mile",
        toUnitName: "Kilometer",
        name: "Miles to Kilometers",
      },
      kilometersToMiles: {
        convert: (kilometers) => kilometers / 1.60934,
        fromUnitName: "Kilometer",
        toUnitName: "Mile",
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
