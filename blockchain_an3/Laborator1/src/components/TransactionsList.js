// src/components/TransactionsList.js

import React, { useEffect, useState } from 'react';
import { EtherscanProvider } from 'ethers'; // Import the correct provider from ethers

const ETHERSCAN_API_KEY = 'your_etherscan_api_key_here'; // Add your Etherscan API key

const TransactionsList = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      fetchTransactions();
    }
  }, [account]);

  const fetchTransactions = async () => {
    try {
      const provider = new EtherscanProvider('homestead', ETHERSCAN_API_KEY);
      
      // Get the transaction history of the account
      const history = await provider.getHistory(account);
      setTransactions(history);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions: ', error);
      setLoading(false);
    }
  };

  return (
    <div className="transactions-list">
      <h2>Transactions for Account: {account}</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found for this account.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash}>
              <p>Transaction Hash: {tx.hash}</p>
              <p>Block Number: {tx.blockNumber}</p>
              <p>Gas Used: {tx.gasUsed.toString()}</p>
              <p>Timestamp: {new Date(tx.timestamp * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsList;
