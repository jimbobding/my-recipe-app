import { createSlice } from "@reduxjs/toolkit";

const temperatureSlice = createSlice({
  name: "temperature",
  initialState: {
    selectedUnitPair: "celsiusToFahrenheit",
    conversionRates: {
      celsiusToFahrenheit: {
        convert: (celsius) => (celsius * 9) / 5 + 32,
        fromUnitName: "Celsius",
        toUnitName: "Fahrenheit",
        name: "Celsius to Fahrenheit",
      },
      fahrenheitToCelsius: {
        convert: (fahrenheit) => ((fahrenheit - 32) * 5) / 9,
        fromUnitName: "Fahrenheit",
        toUnitName: "Celsius",
        name: "Fahrenheit to Celsius",
      },
      celsiusToKelvin: {
        convert: (celsius) => celsius + 273.15,
        fromUnitName: "Celsius",
        toUnitName: "Kelvin",
        name: "Celsius to Kelvin",
      },
      kelvinToCelsius: {
        convert: (kelvin) => kelvin - 273.15,
        fromUnitName: "Kelvin",
        toUnitName: "Celsius",
        name: "Kelvin to Celsius",
      },
      fahrenheitToKelvin: {
        convert: (fahrenheit) => ((fahrenheit - 32) * 5) / 9 + 273.15,
        fromUnitName: "Fahrenheit",
        toUnitName: "Kelvin",
        name: "Fahrenheit to Kelvin",
      },
      kelvinToFahrenheit: {
        convert: (kelvin) => ((kelvin - 273.15) * 9) / 5 + 32,
        fromUnitName: "Kelvin",
        toUnitName: "Fahrenheit",
        name: "Kelvin to Fahrenheit",
      },
    },
  },
  reducers: {
    setSelectedUnitPair(state, action) {
      state.selectedUnitPair = action.payload;
    },
  },
});

export const { setSelectedUnitPair } = temperatureSlice.actions;
export default temperatureSlice.reducer;
