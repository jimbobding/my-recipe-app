import { createSlice } from "@reduxjs/toolkit";

const temperatureSlice = createSlice({
  name: "temperature",
  initialState: {
    selectedUnitPair: "celsiusToFahrenheit",
    conversionRates: {
      celsiusToFahrenheit: {
        convert: (celsius) => (celsius * 9) / 5 + 32,
        name: "Celsius to Fahrenheit",
      },
      fahrenheitToCelsius: {
        convert: (fahrenheit) => ((fahrenheit - 32) * 5) / 9,
        name: "Fahrenheit to Celsius",
      },
      celsiusToKelvin: {
        convert: (celsius) => celsius + 273.15,
        name: "Celsius to Kelvin",
      },
      kelvinToCelsius: {
        convert: (kelvin) => kelvin - 273.15,
        name: "Kelvin to Celsius",
      },
      fahrenheitToKelvin: {
        convert: (fahrenheit) => ((fahrenheit - 32) * 5) / 9 + 273.15,
        name: "Fahrenheit to Kelvin",
      },
      kelvinToFahrenheit: {
        convert: (kelvin) => ((kelvin - 273.15) * 9) / 5 + 32,
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
