import { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WalletProvider } from './utils/Context';
import routes from "./routes/router";
import TransactionsList from './components/TransactionsList';  // Import TransactionsList component

import './styles/App.css';

const router = createBrowserRouter(routes);

function App() {
  const [account, setAccount] = useState(null);  // State to track connected account

  // Function to handle wallet connection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Ensure account is set properly and wrapped as an object to avoid null issues
        if (selectedAccount) {
          setAccount({ address: selectedAccount });  // Wrap the account address in an object
        } else {
          console.error('No account selected');
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <WalletProvider>
      {useMemo(() => (
        <div className="App">
          <RouterProvider router={router} />
          
          {/* Add a button to connect the wallet */}
          {!account || !account.address ? (  // Check for null account and address
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <div>
              <p>Connected account: {account.address}</p>  {/* Access account address safely */}
              {/* Render the TransactionsList component after the wallet is connected */}
              <TransactionsList account={account} />
            </div>
          )}
        </div>
      ), [account])}
    </WalletProvider>
  );
}

export default App;
