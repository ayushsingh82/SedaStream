import React, { useState } from 'react';
import Started from './Started';


const networks = [
    { value: 'optimism', label: 'Optimism', image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
    { value: 'arbitrum', label: 'Arbitrum', image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
    { value: 'base', label: 'Base', image: 'https://cryptologos.cc/logos/base-base-logo.png?v=024' },
    { value: 'ethereum', label: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { value: 'avalanche', label: 'Avalanche', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
    { value: 'polygon', label: 'Polygon', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' }
  ];
  

const GetTokenTransfer = () => {

    const [selectedNetwork, setSelectedNetwork] = useState(null); // Manage selected network state
    const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown open/close state
  
    const handleNetworkChange = (network) => {
      setSelectedNetwork(network); // Update selected network
      setDropdownOpen(false); // Close the dropdown after selection
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen); // Toggle dropdown open/close state
    };

  return (
    <section className="pt-4 md:pt-6 bg-gradient-to-b from-[#1F1B30] via-[#3A2A52] to-[#4A3A78] overflow-x-clip h-screen w-screen text-center text-white ">
   <span className='font-semibold text-xl'>GetTokenTransfer</span> 
   
    <div className="flex justify-center items-center mb-6">
    <div className="text-center">
      <label htmlFor="network" className="text-white font-semibold mb-2 block mt-[40px] border border-2 rounded-md bg-black text-white px-[3px] border-transparent text-lg">
        Select Network:
      </label>
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown} // Toggle dropdown visibility
          className="p-2 bg-white font-medium text-black rounded-lg inline-flex items-center"
        >
          {selectedNetwork ? (
            <>
              <img
                src={selectedNetwork.image}
                alt={selectedNetwork.label}
                className="w-6 h-6 mr-2"
              />
              {selectedNetwork.label}
            </>
          ) : (
            'Select a network'
          )}
          <svg
            className={`ml-2 w-4 h-4 transition-transform ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
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

  </section>

  );
};

export default GetTokenTransfer;
