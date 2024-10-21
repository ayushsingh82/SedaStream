import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from React Router

const networks = [
  { value: 'optimism', label: 'Optimism', image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
  { value: 'arbitrum', label: 'Arbitrum', image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { value: 'ethereum', label: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { value: 'avalanche', label: 'Avalanche', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { value: 'polygon', label: 'Polygon', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' }
];

const Started = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(null); // Manage selected network state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown open/close state

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network); // Update selected network
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown open/close state
  };

  const [selectedBox, setSelectedBox] = useState(1);

  const boxes = [
    { id: 1, label: 'Account Balance', route: '/account-balance' },
    { id: 2, label: 'Token Price', route: '/tokenprize' },
    { id: 3, label: 'Get Currencies', route: '/currencies' },
    { id: 4, label: 'Get Token Holder', route: '/tokenholders' },
    { id: 5, label: 'Token Transfer', route: '/tokentransfer' }
  ];

  const handleBoxClick = (id) => {
    setSelectedBox(id); // Only update the selected box
  };

  return (
    <section className="pt-4 md:pt-6 bg-gradient-to-b from-[#1F1B30] via-[#3A2A52] to-[#4A3A78] overflow-x-clip h-screen w-screen">
      
      {/* Boxes for navigation */}
      <div className="mt-6 flex flex-wrap justify-center items-center space-x-4 mx-[50px] px-4">
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            className={`flex-1 p-4 m-2 rounded-lg shadow-lg text-center cursor-pointer transition-colors duration-300 ${
              selectedBox === box.id ? 'bg-transparent border-2 border-white font-semibold text-white' : 'bg-white text-black border-2 border-white font-semibold '
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleBoxClick(box.id)} // Only change selected box state
          >
            <Link to={box.route} className="block w-full h-full">
              {/* Use Link to navigate between routes */}
              {box.label}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Custom network selection dropdown */}
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

export default Started;
