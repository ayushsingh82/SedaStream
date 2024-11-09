import React, { useState } from 'react';

const Base = () => {
  const [method, setMethod] = useState('eth_blockNumber');
  const [toAddress, setToAddress] = useState('');
  const [blockHash, setBlockHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body;
    const url = 'https://base-mainnet.nodit.io/';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1', // Ensure your API key is valid.
      },
    };

    // Construct the body based on the selected method
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
            data: `0x70a08231000000000000000000000000${data}` // Ensure data is properly formatted
          },
          'latest'
        ],
      });
    } else if (method === 'eth_estimateGas') {
      // Ensure 'value' is in hexadecimal format (Wei in hex)
      const hexValue = `0x${parseInt(value, 10).toString(16)}`;
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [
          {
            from: fromAddress,
            to: toAddress,
            value: hexValue // Use hex value here
          }
        ],
      });
    } else if (method === 'eth_getBlockByHash') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [blockHash, false]
      });
    } else if (method === 'eth_getLogs') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [{}] // Add filter conditions if needed
      });
    }

    try {
      const res = await fetch(url, { ...options, body });

      // Check if response is OK (status code 200-299)
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      
      // Log the entire response for debugging
      console.log('Response:', json);
      
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
          borderImage: 'linear-gradient(90deg, #00BFFF, #1E90FF, #00008B) 1',
          borderStyle: 'solid',
        }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">Base  Explorer</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
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
                <label className="block mb-2 text-sm font-medium text-gray-300">To Address</label>
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Data</label>
                <input
                  type="text"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
                />
              </div>
            </>
          )}

          {method === 'eth_estimateGas' && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">From Address</label>
                <input
                  type="text"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">To Address</label>
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Value (in Wei)</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
                />
              </div>
            </>
          )}

          {method === 'eth_getBlockByHash' && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Block Hash</label>
              <input
                type="text"
                value={blockHash}
                onChange={(e) => setBlockHash(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-black text-white w-full"
              />
            </div>
          )}

          <button
            type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 text-white rounded hover:bg-red-600 w-full"
          >
            Fetch Data
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-800 text-white p-4 rounded-lg max-h-96 overflow-auto">
            <h2 className="text-xl font-semibold mb-2">Response</h2>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Base;