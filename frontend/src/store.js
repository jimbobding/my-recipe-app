import { configureStore } from "@reduxjs/toolkit";
import weightReducer from "./features/conversion/weight/weightSlice";
import temperatureReducer from "./features/conversion/temperature/temperatureSlice";
import volumeReducer from "./features/conversion/volume/volumeSlice";
import lengthReducer from "./features/conversion/length/lengthSlice";

const store = configureStore({
  reducer: {
    weight: weightReducer,
    temperature: temperatureReducer,
    volume: volumeReducer,
    length: lengthReducer,
  },
});

export default store;
