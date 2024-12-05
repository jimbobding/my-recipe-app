import React from "react";
import { useConversion } from "../hooks/useConversion";
import "../styles/components/_unitConverter.scss";

const ConversionPage = () => {
  // Volume Conversion
  const {
    inputValue: volumeInputValue,
    convertedValue: volumeConvertedValue,
    handleUnitPairChange: handleVolumeUnitPairChange,
    handleInputChange: handleVolumeInputChange,
    selectedUnitPair: selectedVolumeUnitPair,
    conversionRates: volumeConversionRates,
    fromUnitName: volumeFromUnitName,
    toUnitName: volumeToUnitName,
  } = useConversion("volume");

  // Temperature Conversion
  const {
    inputValue: temperatureInputValue,
    convertedValue: temperatureConvertedValue,
    handleUnitPairChange: handleTemperatureUnitPairChange,
    handleInputChange: handleTemperatureInputChange,
    selectedUnitPair: selectedTemperatureUnitPair,
    conversionRates: temperatureConversionRates,
    toUnitName: temperatureToUnitName,
    fromUnitName: temperatureFromUnitName,
  } = useConversion("temperature");

  // Weight Conversion
  const {
    inputValue: weightInputValue,
    convertedValue: weightConvertedValue,
    handleUnitPairChange: handleWeightUnitPairChange,
    handleInputChange: handleWeightInputChange,
    selectedUnitPair: selectedWeightUnitPair,
    conversionRates: weightConversionRates,
    fromUnitName: weightFromUnitName,
    toUnitName: weightToUnitName,
  } = useConversion("weight");

  // Length Conversion
  const {
    inputValue: lengthInputValue,
    convertedValue: lengthConvertedValue,
    handleUnitPairChange: handleLengthUnitPairChange,
    handleInputChange: handleLengthInputChange,
    selectedUnitPair: selectedLengthUnitPair,
    conversionRates: lengthConversionRates,
    fromUnitName: lengthFromUnitName,
    toUnitName: lengthToUnitName,
  } = useConversion("length");

  return (
    <div className="conversion-container">
      {/* Volume Conversion */}
      <div className="volume-container">
        <div className="converter-container">
          <h2>Volume Conversion</h2>
          <label htmlFor="volumeUnitPair">Choose conversion type:</label>
          <select
            id="volumeUnitPair"
            value={selectedVolumeUnitPair}
            onChange={handleVolumeUnitPairChange}
            className="converter__input"
          >
            {Object.entries(volumeConversionRates).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>

          <div>
            <h3>Enter Value to Convert:</h3>
            <input
              type="number"
              value={volumeInputValue}
              onChange={handleVolumeInputChange}
              placeholder="Enter a value"
              className="converter__input"
            />
            <span> {volumeFromUnitName}</span>
            {volumeConvertedValue !== null && (
              <h3>
                Converted Value: {volumeConvertedValue.toFixed(2)}{" "}
                {volumeToUnitName}
              </h3>
            )}
          </div>
        </div>
      </div>
      {/* Temperature Conversion */}
      <div className="temperature-container">
        <div className="converter-container">
          <h2>Temperature Conversion</h2>
          <label htmlFor="temperatureUnitPair">Choose conversion type:</label>
          <select
            id="temperatureUnitPair"
            value={selectedTemperatureUnitPair}
            onChange={handleTemperatureUnitPairChange}
            className="converter__input"
          >
            {Object.entries(temperatureConversionRates).map(
              ([key, { name }]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              )
            )}
          </select>
          <div>
            <h3>Enter Value to Convert:</h3>
            <input
              type="number"
              value={temperatureInputValue}
              onChange={handleTemperatureInputChange}
              placeholder="Enter a value"
              className="converter__input"
            />
            <span> {temperatureFromUnitName}</span>
            {temperatureConvertedValue !== null && (
              <h3>
                Converted Value: {temperatureConvertedValue}
                {temperatureToUnitName}
              </h3>
            )}
          </div>
        </div>
      </div>
      {/* Weight Conversion */}
      <div className="weight-container">
        <div className="converter-container">
          <h2>Weight Conversion</h2>
          <label htmlFor="weightUnitPair">Choose conversion type:</label>
          <select
            id="weightUnitPair"
            value={selectedWeightUnitPair}
            onChange={handleWeightUnitPairChange}
            className="converter__input"
          >
            {Object.entries(weightConversionRates).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <div>
            <h3>Enter Value to Convert:</h3>
            <input
              type="number"
              value={weightInputValue}
              onChange={handleWeightInputChange}
              placeholder="Enter a value"
              className="converter__input"
            />
            <span> {weightFromUnitName}</span>
            {weightConvertedValue !== null && (
              <h3>
                Converted Value: {weightConvertedValue} {weightToUnitName}
              </h3>
            )}
          </div>
        </div>
      </div>
      {/* Length Conversion */}
      <div className="length-container">
        <div className="converter-container">
          <h2>Length Conversion</h2>
          <label htmlFor="lengthUnitPair">Choose conversion type:</label>
          <select
            id="lengthUnitPair"
            value={selectedLengthUnitPair}
            onChange={handleLengthUnitPairChange}
            className="converter__input"
          >
            {Object.entries(lengthConversionRates).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <div>
            <h3>Enter Value to Convert:</h3>
            <input
              type="number"
              value={lengthInputValue}
              onChange={handleLengthInputChange}
              placeholder="Enter a value"
              className="converter__input"
            />
            <span> {lengthFromUnitName}</span>
            {lengthConvertedValue !== null && (
              <h3>
                Converted Value: {lengthConvertedValue} {lengthToUnitName}{" "}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionPage;
