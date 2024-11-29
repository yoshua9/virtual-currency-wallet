import React from "react";

const ConverterData = ({ selectedPairs }) => {
  /** functions **/
  const convertPair = (pair) => {
      const exchangeRates = JSON.parse(localStorage.getItem('exchangeRates'));
      const userBalance = JSON.parse(localStorage.getItem('userData')).balance;

      // Redondear a 2 decimales
      const value = Number(exchangeRates[pair]).toFixed(8);
      const conversion = (exchangeRates[pair] * userBalance).toFixed(8);

      return (
        <div className="flex flex-col w-2/3">
          <p className="text-white text-start">Valor por euro: {value}</p>
          <p className="text-white text-start">Conversión (balance): {conversion}</p>
        </div>
      );
  };

  return (
    <div className="h-full py-10">
      <div className="max-w-xl m-auto mb-10">
        <h2 className="text-3xl text-white">Datos de conversión</h2>
        <p className="text-xl font-bold text-white mb-5">{`Balance: €${JSON.parse(localStorage.getItem('userData')).balance}`}</p>
        <div className="flex flex-col gap-5">
          {selectedPairs.map((pair) => (
            <div key={pair} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <p className="text-white w-1/3 text-left">{pair}</p>
              {convertPair(pair)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConverterData;
