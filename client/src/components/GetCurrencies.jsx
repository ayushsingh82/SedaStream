import React, { useEffect, useState } from 'react';
import axios from 'axios';

const networks = [
  { value: 'eth', label: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { value: 'optimism', label: 'Optimism', image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
  { value: 'arbitrum', label: 'Arbitrum', image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { value: 'polygon', label: 'Polygon', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { value: 'avalanche', label: 'Avalanche', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { value: 'base', label: 'Base', image: 'https://cryptologos.cc/logos/base-base-logo.png?v=024' },
];

const GetCurrencies = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]); // Default to first network
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown open/close state

  const fetchCurrencies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://rpc.ankr.com/multichain', {
        jsonrpc: "2.0",
        method: "ankr_getCurrencies",
        params: { blockchain: selectedNetwork.value },
        id: 1
      });
      setCurrencies(response.data.result.currencies);
    } catch (err) {
      setError('Error fetching currencies');
    } finally {
      setLoading(false);
    }
  };
 
  console.log(error);
  console.log(selectedNetwork.value);

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network); // Update selected network
    setDropdownOpen(false); // Close the dropdown after selection
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown open/close state
  };

  const handleFetchClick = () => {
    fetchCurrencies(); // Call fetchCurrencies when the button is clicked
  };

  if (loading) return <div className="text-white">Loading currencies...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="pt-4 md:pt-6 bg-gradient-to-b from-[#1F1B30] via-[#3A2A52] to-[#4A3A78] overflow-x-clip h-screen w-screen text-center text-white">
      <h1 className='font-semibold text-xl mb-4'>Available Currencies</h1>
      
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <label htmlFor="network" className="text-white font-semibold mb-2 block">
            Select Network:
          </label>
          <div className="relative inline-block">
            <button
              onClick={toggleDropdown} // Toggle dropdown visibility
              className="p-2 bg-white font-medium text-black rounded-lg inline-flex items-center"
            >
              <img
                src={selectedNetwork.image}
                alt={selectedNetwork.label}
                className="w-6 h-6 mr-2"
              />
              {selectedNetwork.label}
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                {networks.map((network) => (
                  <li
                    key={network.value}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleNetworkChange(network)}
                  >
                    <img
                      src={network.image}
                      alt={network.label}
                      className="w-6 h-6 mr-2"
                    />
                    {network.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleFetchClick} // Fetch currencies on button click
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Fetch Currencies
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {currencies.map((currency) => (
          <div key={currency.address} className="bg-black rounded-lg p-4 shadow-lg">
            <img src={currency.thumbnail} alt={currency.name} className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-lg font-bold">{currency.name} ({currency.symbol})</h2>
            <p className="text-sm">Address: {currency.address}</p>
            <p className="text-sm">Decimals: {currency.decimals}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetCurrencies;
