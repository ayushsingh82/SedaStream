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
   * Fetches Ethereum gas price, estimated gas, and block number data.
   */
  export function executionPhase(): void {
    // Fetch Ethereum gas price
    const gasResponse = httpFetch("https://ethgasstation.info/api/ethgasAPI.json");
  
    if (!gasResponse.ok) {
      Console.error(
        `Gas Price Fetch Error: ${gasResponse.status.toString()} - ${gasResponse.bytes.toUtf8String()}`
      );
      Process.error(Bytes.fromUtf8String("Error while fetching Ethereum gas price"));
    }
  
    const gasData = gasResponse.bytes.toJSON<GasPriceResponse>();
    const fastGasPrice = f32.parse(gasData.fast) / 10; // Convert to Gwei
    if (isNaN(fastGasPrice)) {
      Process.error(Bytes.fromUtf8String(`Error parsing gas price: ${gasData.fast}`));
    }
    const gasPriceResult = u128.from(fastGasPrice * 1000000);
  
    // Fetch Ethereum block number
    const blockResponse = httpFetch("https://api.etherscan.io/api?module=proxy&action=eth_blockNumber");
  
    if (!blockResponse.ok) {
      Console.error(
        `Block Number Fetch Error: ${blockResponse.status.toString()} - ${blockResponse.bytes.toUtf8String()}`
      );
      Process.error(Bytes.fromUtf8String("Error while fetching Ethereum block number"));
    }
  
    const blockData = blockResponse.bytes.toJSON<BlockNumberResponse>();
    const blockNumber = u128.fromString(blockData.result);
  
    // Log the estimated gas and block number
    Console.log(`Fast Gas Price: ${gasPriceResult}`);
    Console.log(`Latest Block Number: ${blockNumber}`);
  
    // Report the gas price and block number back to SEDA network
    Process.success(Bytes.fromNumber<u128>(gasPriceResult));
    Process.success(Bytes.fromNumber<u128>(blockNumber));
  }
  