import { createSlice } from "@reduxjs/toolkit";

const weightSlice = createSlice({
  name: "weight",
  initialState: {
    selectedUnitPair: "cupToGram", // Default conversion pair
    conversionRates: {
      cupToGram: {
        convert: (cups) => cups * 240,
        name: "Cup to Grams",
      },
      poundToGram: {
        convert: (pounds) => pounds * 453.592,
        name: "Pound to Grams",
      },
      usCupToGram: {
        convert: (cups) => cups * 236.588,
        name: "US Cup to Grams",
      },
      ounceToGram: {
        convert: (ounces) => ounces * 28.3495,
        name: "Ounce to Grams",
      },
      literToCup: {
        convert: (liters) => liters * 4.22675,
        name: "Liter to Cups",
      },
      tablespoonToGram: {
        convert: (tablespoons) => tablespoons * 15,
        name: "Tablespoon to Grams",
      },
      teaspoonToGram: {
        convert: (teaspoons) => teaspoons * 5,
        name: "Teaspoon to Grams",
      },
    },
  },
  reducers: {
    setSelectedUnitPair(state, action) {
      state.selectedUnitPair = action.payload; // Update the selected conversion pair
    },
  },
});

export const { setSelectedUnitPair } = weightSlice.actions;
export default weightSlice.reducer;
