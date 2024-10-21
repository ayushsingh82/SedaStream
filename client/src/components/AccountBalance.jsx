import React, { useState } from 'react';

const networks = [
    { value: 'eth', label: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { value: 'bsc', label: 'Binance Smart Chain', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
    { value: 'polygon', label: 'Polygon', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
    { value: 'optimism', label: 'Optimism', image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
    { value: 'arbitrum', label: 'Arbitrum', image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' }
];

const AccountBalance = () => {
    const [selectedNetwork, setSelectedNetwork] = useState(null); // Manage selected network state
    const [walletAddress, setWalletAddress] = useState(''); // Manage wallet address input
    const [accountData, setAccountData] = useState(null); // Store account data
    const [error, setError] = useState(null); // Handle errors
    const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown open/close state

    const handleNetworkChange = (network) => {
        setSelectedNetwork(network); // Update selected network
        setDropdownOpen(false); // Close the dropdown after selection
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown open/close state
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
                    method: "eth_getBalance", // Correct method for Ethereum-compatible chains
                    params: [
                        walletAddress, // Wallet address to fetch balance for
                        "latest" // Get the latest balance
                    ],
                    id: 1
                })
            });

            const data = await response.json();
            console.log('API Response:', data); // Log the full response

            if (data.result) {
                // Convert balance from wei to ETH
                const balanceInEth = parseFloat(data.result) / Math.pow(10, 18);
                setAccountData({ balanceInEth });
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
            <span className='font-semibold text-xl'>Account Balance</span>
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

                    <div className="mt-4">
                        <input
                            type="text"
                            className="p-2 bg-black text-white rounded-lg border border-purple-500 w-64"
                            placeholder="Enter Wallet Address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleFetchBalance}
                        className="mt-4 bg-purple-600 p-2 rounded-lg text-white font-medium"
                    >
                        Fetch Balance
                    </button>

                    {accountData && (
                        <div className="mt-4">
                            <p>Balance: {accountData.balanceInEth} ETH</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 text-red-500">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AccountBalance;
