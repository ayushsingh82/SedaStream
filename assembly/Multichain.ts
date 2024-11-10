import {
    Bytes,
    Console,
    Process,
    httpFetch,
    u128,
  } from "@seda-protocol/as-sdk/assembly";
  
  // API response structures for gas price and block data
  @json
  class GasPriceResponse {
    fast!: string;
  }
  
  @json
  class BlockNumberResponse {
    result!: string;
  }
  
  /**
   * Supported chains with API URLs for gas prices and block numbers.
   */
  const chainConfig = {
    ethereum: {
      gasPriceUrl: "https://ethgasstation.info/api/ethgasAPI.json",
      blockNumberUrl: "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber",
    },
    base: {
      gasPriceUrl: "https://basechain.api/gas", // Replace with actual Base API
      blockNumberUrl: "https://basechain.api/block", // Replace with actual Base API
    },
    arbitrum: {
      gasPriceUrl: "https://arbitrum.api/gas", // Replace with actual Arbitrum API
      blockNumberUrl: "https://arbitrum.api/block", // Replace with actual Arbitrum API
    },
    optimism: {
      gasPriceUrl: "https://optimism.api/gas", // Replace with actual Optimism API
      blockNumberUrl: "https://optimism.api/block", // Replace with actual Optimism API
    },
    polygon: {
      gasPriceUrl: "https://polygon.api/gas", // Replace with actual Polygon API
      blockNumberUrl: "https://polygon.api/block", // Replace with actual Polygon API
    },
  };
  
  /**
   * Fetches gas price and block number data for a specified chain.
   * @param chain The name of the chain to fetch data for (e.g., "ethereum", "base").
   */
  function fetchChainData(chain: string): void {
    const config = chainConfig[chain];
  
    if (!config) {
      Console.error(`Unsupported chain: ${chain}`);
      Process.error(Bytes.fromUtf8String("Unsupported chain"));
      return;
    }
  
    // Fetch gas price
    const gasResponse = httpFetch(config.gasPriceUrl);
    if (!gasResponse.ok) {
      Console.error(
        `Gas Price Fetch Error (${chain}): ${gasResponse.status.toString()} - ${gasResponse.bytes.toUtf8String()}`
      );
      Process.error(Bytes.fromUtf8String(`Error fetching gas price for ${chain}`));
      return;
    }
  
    const gasData = gasResponse.bytes.toJSON<GasPriceResponse>();
    const fastGasPrice = f32.parse(gasData.fast) / 10; // Convert to Gwei
    if (isNaN(fastGasPrice)) {
      Process.error(Bytes.fromUtf8String(`Error parsing gas price for ${chain}: ${gasData.fast}`));
      return;
    }
    const gasPriceResult = u128.from(fastGasPrice * 1000000);
  
    // Fetch block number
    const blockResponse = httpFetch(config.blockNumberUrl);
    if (!blockResponse.ok) {
      Console.error(
        `Block Number Fetch Error (${chain}): ${blockResponse.status.toString()} - ${blockResponse.bytes.toUtf8String()}`
      );
      Process.error(Bytes.fromUtf8String(`Error fetching block number for ${chain}`));
      return;
    }
  
    const blockData = blockResponse.bytes.toJSON<BlockNumberResponse>();
    const blockNumber = u128.fromString(blockData.result);
  
    // Log results
    Console.log(`${chain.toUpperCase()} - Fast Gas Price: ${gasPriceResult}`);
    Console.log(`${chain.toUpperCase()} - Latest Block Number: ${blockNumber}`);
  
    // Report results back to SEDA network
    Process.success(Bytes.fromNumber<u128>(gasPriceResult));
    Process.success(Bytes.fromNumber<u128>(blockNumber));
  }
  
  /**
   * Main function to execute data fetching for multiple chains.
   */
  export function executionPhase(): void {
    const chains = ["ethereum", "base", "arbitrum", "optimism", "polygon"];
    for (let i = 0; i < chains.length; i++) {
      fetchChainData(chains[i]);
    }
  }
  