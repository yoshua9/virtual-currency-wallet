import axios from 'axios';

// TODO: Cambiar por variale de entorno (.env)
const API_BASE_URL = 'https://api.coinbase.com/v2';

const fetchExchangeRates = async (currency = 'EUR') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exchange-rates`, {
      params: { currency },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ha ocurrido un error al intentar obtener la lista de divisas');
  }
};

export  {
  fetchExchangeRates,
};
