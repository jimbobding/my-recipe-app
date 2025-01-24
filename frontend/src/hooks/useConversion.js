import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedUnitPair as setTemperatureUnitPair } from "../features/conversion/temperature/temperatureSlice";
import { setSelectedUnitPair as setWeightUnitPair } from "../features/conversion/weight/weightSlice";
import { setSelectedUnitPair as setVolumeUnitPair } from "../features/conversion/volume/volumeSlice";
import { setSelectedUnitPair as setLengthUnitPair } from "../features/conversion/length/lengthSlice";
const unitTypeMap = {
  temperature: {
    selectedUnitPairSelector: (state) => state.temperature.selectedUnitPair,
    conversionRatesSelector: (state) => state.temperature.conversionRates,
    conversionOptionsSelector: (state) => state.temperature.conversionRates,
    setSelectedUnitPairAction: setTemperatureUnitPair,
  },

  weight: {
    selectedUnitPairSelector: (state) => state.weight.selectedUnitPair,
    conversionRatesSelector: (state) => state.weight.conversionRates,
    conversionOptionsSelector: (state) => state.weight.conversionRates,
    setSelectedUnitPairAction: setWeightUnitPair,
  },
  volume: {
    selectedUnitPairSelector: (state) => state.volume.selectedUnitPair,

    conversionRatesSelector: (state) => state.volume.conversionRates,
    conversionOptionsSelector: (state) => state.volume.conversionRates,
    setSelectedUnitPairAction: setVolumeUnitPair,
  },
  length: {
    selectedUnitPairSelector: (state) => state.length.selectedUnitPair,
    conversionRatesSelector: (state) => state.length.conversionRates,
    conversionOptionsSelector: (state) => state.length.conversionRates,
    setSelectedUnitPairAction: setLengthUnitPair,
  },
};

export const useConversion = (conversionType) => {
  const {
    selectedUnitPairSelector,
    conversionRatesSelector,
    setSelectedUnitPairAction,
  } = unitTypeMap[conversionType] || {};

  // Verify the unitTypeMap structure

  const selectedUnitPair = useSelector(
    selectedUnitPairSelector || (() => undefined)
  );

  const conversionRates = useSelector(
    conversionRatesSelector || (() => undefined)
  );

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState(null);

  const handleUnitPairChange = (e) => {
    console.log("handleUnitPairChange called with value:", e.target.value);
    dispatch(setSelectedUnitPairAction?.(e.target.value)); // Ensure action is valid
    setInputValue("");
    setConvertedValue(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);

    const conversionFunction = conversionRates?.[selectedUnitPair]?.convert;

    if (conversionFunction) {
      const result = conversionFunction(Number(value));
      console.log("Converted Value:", result);
      setConvertedValue(result);
    } else {
      console.log("No conversion function found.");
      setConvertedValue(null);
    }
  };

  return {
    inputValue,
    convertedValue,
    handleUnitPairChange,
    handleInputChange,
    selectedUnitPair,
    toUnitName: conversionRates?.[selectedUnitPair]?.toUnitName || "",
    fromUnitName: conversionRates?.[selectedUnitPair]?.fromUnitName || "",
    conversionRates,
  };
};
