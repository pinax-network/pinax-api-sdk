/**
 * Auto-pagination Example - USDT Transfers
 *
 * This example pages through USDT (ERC-20) transfers on Ethereum mainnet.
 * USDT Contract on Ethereum: 0xdac17f958d2ee523a2206206994597c13d831ec7
 *
 * @see https://docs.pinax.network
 */

import { PinaxAPI } from '@pinax/api';

// USDT Token Contract Address on Ethereum Mainnet
const ETHEREUM_USDT_CONTRACT = '0xdac17f958d2ee523a2206206994597c13d831ec7';

async function main() {
  // Initialize the client with your bearer token
  const client = new PinaxAPI({
    apiToken: process.env.PINAX_API_KEY,
  });

  console.log('Auto-pagination: Fetching USDT transfers on Ethereum mainnet...\n');

  // Get transfers using the high-level client
  let page = 1;
  while (true) {
    const data = await client.evm.tokens.getTransfers({
      network: 'mainnet',
      contract: ETHEREUM_USDT_CONTRACT,
      limit: 10,
      end_time: '2025-11-11',
      page
    });
    let datetime = data?.data?.[0]?.datetime ?? 'N/A';
    let value = 0;
    for (const transfer of data?.data ?? []) {
      value += Number(transfer.value);
    }
    console.log(`${datetime} | Transfers ${Math.floor(value)} USDT [Page ${page}]`);
    if (data.data.length < 10) {
      break;
    }
    page++;
  }
}

main().catch(console.error);
