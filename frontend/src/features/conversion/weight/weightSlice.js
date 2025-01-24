import { createSlice } from "@reduxjs/toolkit";

const weightSlice = createSlice({
  name: "weight",
  initialState: {
    selectedUnitPair: "cupToGram", // Default conversion pair
    conversionRates: {
      cupToGram: {
        convert: (cups) => cups * 240,
        fromUnitName: "Cup",
        toUnitName: "Gram",
        name: "Cup to Grams",
      },
      poundToGram: {
        convert: (pounds) => pounds * 453.592,
        fromUnitName: "Pound",
        toUnitName: "Gram",
        name: "Pound to Grams",
      },
      usCupToGram: {
        convert: (cups) => cups * 236.588,
        fromUnitName: "US Cup",
        toUnitName: "Gram",
        name: "US Cup to Grams",
      },
      ounceToGram: {
        convert: (ounces) => ounces * 28.3495,
        fromUnitName: "Ounce",
        toUnitName: "Gram",
        name: "Ounce to Grams",
      },
      literToCup: {
        convert: (liters) => liters * 4.22675,
        fromUnitName: "Liter",
        toUnitName: "Cup",
        name: "Liter to Cups",
      },
      tablespoonToGram: {
        convert: (tablespoons) => tablespoons * 15,
        fromUnitName: "Tablespoon",
        toUnitName: "Gram",
        name: "Tablespoon to Grams",
      },
      teaspoonToGram: {
        convert: (teaspoons) => teaspoons * 5,
        fromUnitName: "Teaspoon",
        toUnitName: "Gram",
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
