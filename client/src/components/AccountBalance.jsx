import React, { useState } from 'react';

// List of networks to select from
const networks = [
  { value: 'eth', label: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { value: 'bsc', label: 'Binance Smart Chain', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
  { value: 'optimism', label: 'Optimism', image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
  { value: 'arbitrum', label: 'Arbitrum', image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { value: 'polygon', label: 'Polygon', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' }
];

const AccountBalance = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(null); // To track the selected network
  const [walletAddress, setWalletAddress] = useState(''); // To track the wallet address input
  const [accountData, setAccountData] = useState(null); // To store fetched account data
  const [error, setError] = useState(null); // To store error messages
  const [dropdownOpen, setDropdownOpen] = useState(false); // To manage the dropdown visibility

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFetchBalance = async () => {
    if (!selectedNetwork || !walletAddress) {
      alert('Please select a network and enter a wallet address');
      return;
    }

    try {
      // Dynamically construct the URL with the selected blockchain and API key
      const apiKey = 'bcb7f62fee476e78211975f273387c44999d44f6e632a6a1d7fca26411e78e04';
      const url = `https://rpc.ankr.com/${selectedNetwork.value}/${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "ankr_getAccountBalance",
          params: {
            blockchain: selectedNetwork.value,
            walletAddress: walletAddress
          },
          id: 1
        })
      });

      const data = await response.json();
      console.log('API Response:', data); // Log the full response

      if (data.result) {
        setAccountData(data.result);
        setError(null);
      } else {
        setError('Error fetching account data');
        setAccountData(null);
      }
    } catch (err) {
      setError('Error fetching account data');
      console.error(err);
      setAccountData(null);
    }
  };

  return (
    <section className="pt-4 md:pt-6 bg-gradient-to-b from-[#1F1B30] via-[#3A2A52] to-[#4A3A78] overflow-x-clip h-screen w-screen text-center text-white">
      <span className='font-semibold text-xl'>Account Balance Fetcher</span>

      {/* Dropdown for network selection */}
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <label htmlFor="network" className="text-white font-semibold mb-2 block mt-[40px] border border-2 rounded-md bg-black text-white px-[3px] border-transparent text-lg">
            Select Network:
          </label>
          <div className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="p-2 bg-white font-medium text-black rounded-lg inline-flex items-center"
            >
              {selectedNetwork ? (
                <>
                  <img
                    src={selectedNetwork.image}
                    alt={selectedNetwork.label}
                    className="w-6 h-6 mr-2 text-black"
                  />
                  {selectedNetwork.label}
                </>
              ) : (
                'Select a network'
              )}
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
                    className="flex items-center p-2 cursor-pointer text-black"
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

      {/* Input for wallet address */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="p-2 bg-black text-white border border-purple-500 rounded-md"
        />
      </div>

      {/* Button to fetch account balance */}
      <button
        onClick={handleFetchBalance}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Fetch Balance
      </button>

      {/* Displaying fetched account data */}
      <div className="mt-6">
        {error && <div className="text-red-500">{error}</div>}
        {accountData && (
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <p><strong>Total Balance (USD):</strong> {accountData.totalBalanceUsd}</p>
            <p><strong>Assets:</strong></p>
            <ul>
              {accountData.assets.map((asset, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Blockchain:</strong> {asset.blockchain}</p>
                  <p><strong>Token Name:</strong> {asset.tokenName}</p>
                  <p><strong>Token Symbol:</strong> {asset.tokenSymbol}</p>
                  <p><strong>Balance:</strong> {asset.balance}</p>
                  <p><strong>USD Value:</strong> {asset.balanceUsd}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountBalance;
