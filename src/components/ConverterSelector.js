import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../api/ApiCoinbase';
import ConverterData from "./ConverterData";
import Select from 'react-select'

const ConverterSelector = () => {
  /** vars **/
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [converterData, setConverterData] = useState(false);

  /** functions **/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchExchangeRates();
        const mappedExchangeRates = Object.entries(response.data.rates).map(([key, value]) => ({
          value: value,
          label: key
        }));
        setExchangeRates(mappedExchangeRates);
        localStorage.setItem('exchangeRates', JSON.stringify(response.data.rates));
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const selectPair = (pair) => {
    if (selectedPairs.length < 3) {
      if (!selectedPairs.includes(pair.label)) {
        setSelectedPairs([...selectedPairs, pair.label]);
      } else {
        alert('El par ya ha sido seleccionado');
      }
    } else {
      alert('No puedes seleccionar más de 3');
    }
  };

  const removeSelectedPair = (pair) => {
    setConverterData(false);
    setSelectedPairs(selectedPairs.filter((selectedPair) => selectedPair !== pair));
  };

  return (
    <div className="h-full py-10 min-h-[90vh]">
      <div className="rounded-lg max-w-xl m-auto mb-10">
        <h2 className="text-3xl text-white">Selecciona pares</h2>
        <p className="text-white mb-5">Puedes seleccionar hasta 3 divisas</p>

        <Select
          options={exchangeRates}
          value={selectedPairs}
          onChange={selectPair}
          closeMenuOnSelect={false}
          maxMenuHeight={200}
          isDisabled={Object.entries(exchangeRates).length === 0}
        />
      </div>

      <div className="rounded-lg max-w-xl m-auto">
        <h2 className="text-3xl text-white mb-5">Pares seleccionados</h2>
        {selectedPairs.length === 0 ? (
          <p>No hay pares seleccionados.</p>
        ) : (
          <>
            <ul className="rounded-lg bg-white px-4 pt-4 !pb-2	 mb-5">
              {selectedPairs.map((pair, index) => (
                <li className="flex justify-between mb-2" key={index}>
                  <p>{pair}</p>
                  <p className="bg-red-600 text-white cursor-pointer px-3 py-1 rounded-lg"
                     onClick={() => removeSelectedPair(pair)}>X</p>
                </li>
              ))}
            </ul>

            <button className="
                bg-gray-800
                hover:bg-white
                hover:border
                hover:border-gray-800
                hover:text-gray-800
                disabled:opacity-50
                text-white
                font-bold
                py-2
                px-4
                mr-2
                rounded
              "
              disabled={selectedPairs.length < 1}
              onClick={() => setConverterData(true)}
            >
              Conversión
            </button>

              <button className="
                hover:bg-gray-800
                bg-white
                border
                border-gray-800
                disabled:opacity-50
                text-gray-800
                hover:text-white
                font-bold
                py-2
                px-4
                rounded
              "
              disabled={selectedPairs.length < 1}
              onClick={() => {
                setSelectedPairs([]);
                setConverterData(false)
              }}
              >
                Resetear conversión
              </button>
          </>

        )}
      </div>

      {converterData && <ConverterData selectedPairs={selectedPairs}/>}
    </div>
  );
};

export default ConverterSelector;
