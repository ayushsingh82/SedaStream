import React, { useState, useRef } from 'react';

const Ethereum = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [response, setResponse] = useState('');
  const [apiType, setApiType] = useState('nativeBalance');
  
  const apiKey = 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1';

  const apiUrls = {
    nativeBalance: 'https://web3.nodit.io/v1/ethereum/mainnet/native/getNativeBalanceByAccount',
    tokenMetadata: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenContractMetadataByContracts',
    tokenHolders: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenHoldersByContract',
    tokenTransfersByAccount: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
    tokenTransfersByContract: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByContract',
    tokensOwnedByAccount: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokensOwnedByAccount',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';
    let body = {};

    switch (apiType) {
      case 'nativeBalance':
        url = apiUrls.nativeBalance;
        body = { accountAddress };
        break;
      case 'tokenMetadata':
        url = apiUrls.tokenMetadata;
        body = { contractAddresses: [contractAddress] };
        break;
      case 'tokenHolders':
        url = apiUrls.tokenHolders;
        body = { contractAddress };
        break;
      case 'tokenTransfersByAccount':
        url = apiUrls.tokenTransfersByAccount;
        body = {
          accountAddress,
          fromBlock: '19415000',
          toBlock: 'latest',
          withCount: false,
          withZeroValue: true,
        };
        break;
      case 'tokenTransfersByContract':
        url = apiUrls.tokenTransfersByContract;
        body = {
          contractAddress,
          fromBlock: '19415000',
          toBlock: 'latest',
          withCount: false,
          withZeroValue: true,
        };
        break;
      case 'tokensOwnedByAccount':
        url = apiUrls.tokensOwnedByAccount;
        body = { accountAddress, withCount: false };
        break;
      default:
        break;
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(body),
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResponse(`Error: ${err.message}`);
    }
  };

  // Draggable logic
  const responseRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(responseRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dy = e.clientY - startY;
      responseRef.current.scrollTop = scrollTop - dy;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Input box styling
  const inputStyle = {
    backgroundColor: '#000',
    border: 'none',
    color: '#fff',
    padding: '10px',
    borderRadius: '6px',
    width: '100%',
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div
        className="p-8 rounded-lg border-4 border-transparent bg-clip-padding max-w-3xl w-full"
        style={{ borderImage: 'linear-gradient(90deg, #FF0080, #7928CA) 1' }}
      >
        <h1 className="text-white text-xl font-semibold  mb-4 text-purple-500">Ethereum Token Explorer</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Select API Call</label>
            <select
              value={apiType}
              onChange={(e) => setApiType(e.target.value)}
              style={inputStyle}
            >
              <option value="nativeBalance">Get Native Balance by Account</option>
              <option value="tokenMetadata">Get Token Contract Metadata</option>
              <option value="tokenHolders">Get Token Holders by Contract</option>
              <option value="tokenTransfersByAccount">Get Token Transfers by Account</option>
              <option value="tokenTransfersByContract">Get Token Transfers by Contract</option>
              <option value="tokensOwnedByAccount">Get Tokens Owned By Account</option>
            </select>
          </div>

          {['nativeBalance', 'tokenTransfersByAccount', 'tokensOwnedByAccount'].includes(apiType) && (
            <div>
              <label className="block text-white mb-2">Account Address</label>
              <input
                type="text"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                style={inputStyle}
                placeholder="Enter Account Address"
              />
            </div>
          )}

          {['tokenMetadata', 'tokenHolders', 'tokenTransfersByContract'].includes(apiType) && (
            <div>
              <label className="block text-white mb-2">Contract Address</label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={inputStyle}
                placeholder="Enter Contract Address"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-4 font-semibold py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:bg-pink-700"
          >
            Fetch Data
          </button>
        </form>

        {response && (
          <div
            ref={responseRef}
            className="mt-4 p-4 bg-gray-800 text-white rounded"
            style={{ maxHeight: '300px', overflow: 'auto', cursor: 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <h2 className="text-lg font-semibold mb-2">Response</h2>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ethereum;



//account - 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
//contract - 0xdAC17F958D2ee523a2206206994597C13D831ec7