import { createSlice } from "@reduxjs/toolkit";

const volumeSlice = createSlice({
  name: "volume",
  initialState: {
    selectedUnitPair: "litersToGallons", // Default unit pair
    conversionRates: {
      litersToGallons: {
        convert: (liters) => liters * 0.264172,
        name: "Liters to Gallons",
      },
      gallonsToLiters: {
        convert: (gallons) => gallons / 0.264172,
        name: "Gallons to Liters",
      },
      millilitersToOunces: {
        convert: (ml) => ml * 0.033814,
        name: "Milliliters to Ounces",
      },
      ouncesToMilliliters: {
        convert: (ounces) => ounces / 0.033814,
        name: "Ounces to Milliliters",
      },
    },
  },
  reducers: {
    setSelectedUnitPair(state, action) {
      state.selectedUnitPair = action.payload;
    },
  },
});

export const { setSelectedUnitPair } = volumeSlice.actions;

export default volumeSlice.reducer;
