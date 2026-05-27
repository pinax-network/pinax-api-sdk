/**
 * Tron Transfers Example - USDT Transfers
 *
 * This example retrieves USDT (TRC-20) transfers on the Tron network.
 * USDT Contract on Tron: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
 *
 * @see https://docs.pinax.network
 */

import { PinaxAPI } from '@pinax/api';

// USDT Token Contract Address on Tron Network
const TRON_USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

async function main() {
  // Initialize the client with your bearer token
  const client = new PinaxAPI({
    apiToken: process.env.PINAX_API_KEY,
  });

  console.log('Auto-pagination: Fetching USDT transfers on Tron network...\n');

  // Get transfers using the high-level client
  let page = 1;
  while (true) {
    const data = await client.tvm.tokens.getTransfers({
      network: 'tron',
      contract: TRON_USDT_CONTRACT,
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
