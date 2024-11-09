import React, { useState } from 'react';

const Multichain = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('polygon');
  const [method, setMethod] = useState('eth_blockNumber');
  const [toAddress, setToAddress] = useState('');
  const [blockHash, setBlockHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');

  const apiUrls = {
    polygon: 'https://polygon-mainnet.nodit.io/',
    base: 'https://base-mainnet.nodit.io/',
    arbitrum: 'https://arbitrum-mainnet.nodit.io/',
    optimism: 'https://optimism-mainnet.nodit.io/',
    ethereum: 'https://ethereum-mainnet.nodit.io/',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body;
    const url = apiUrls[selectedNetwork];
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1', // Ensure your API key is valid.
      },
    };

    if (method === 'eth_blockNumber') {
      body = JSON.stringify({ id: 1, jsonrpc: '2.0', method });
    } else if (method === 'eth_call') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [
          {
            to: toAddress,
            data: `0x70a08231000000000000000000000000${data}`,
          },
          'latest',
        ],
      });
    } else if (method === 'eth_estimateGas') {
      const hexValue = `0x${parseInt(value, 10).toString(16)}`;
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [
          {
            from: fromAddress,
            to: toAddress,
            value: hexValue,
          },
        ],
      });
    } else if (method === 'eth_getBlockByHash') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [blockHash, false],
      });
    } else if (method === 'eth_getLogs') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [{}],
      });
    }

    try {
      const res = await fetch(url, { ...options, body });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
    <div
      className="bg-black p-8 rounded shadow-md w-full max-w-lg border-4"
      style={{
        borderImage: 'linear-gradient(90deg, #FF0000, #FF4C00, #FF8C00) 1', 
        borderStyle: 'solid',
      }}>
        <div className="p-8 w-full max-w-xl bg-black text-white rounded-lg">
          <h1 className="text-3xl mb-6 text-center">Multichain Explorer</h1>

          <div className="mb-4">
            <label className="block mb-2">Select Network</label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full bg-black text-white"
            >
              <option value="polygon">Polygon</option>
              <option value="base">Base</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="ethereum">Ethereum</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-black text-white"
              >
                <option value="eth_blockNumber">eth_blockNumber</option>
                <option value="eth_call">eth_call</option>
                <option value="eth_estimateGas">eth_estimateGas</option>
                <option value="eth_getBlockByHash">eth_getBlockByHash</option>
                <option value="eth_getLogs">eth_getLogs</option>
              </select>
            </div>

            {method === 'eth_call' && (
              <>
                <div>
                  <label className="block mb-2">To Address</label>
                  <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">Data</label>
                  <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                  />
                </div>
              </>
            )}

            {method === 'eth_estimateGas' && (
              <>
                <div>
                  <label className="block mb-2">From Address</label>
                  <input
                    type="text"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">To Address</label>
                  <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">Value (in Wei)</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                  />
                </div>
              </>
            )}

            {method === 'eth_getBlockByHash' && (
              <div>
                <label className="block mb-2">Block Hash</label>
                <input
                  type="text"
                  value={blockHash}
                  onChange={(e) => setBlockHash(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full bg-black text-white"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-red-300 via-red-500 to-red-600 text-white rounded hover:bg-red-600 w-full"
            >
              Fetch Data
            </button>
          </form>

          {response && (
            <div className="mt-4 p-4 bg-gray-800 rounded text-white">
              <h2 className="text-lg font-semibold mb-2">Response</h2>
              <pre className="whitespace-pre-wrap">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Multichain;