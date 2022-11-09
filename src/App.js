import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coins from "./Coins";
// Web3
import { ethers } from "ethers";
import WalletProfile from "./Wallet";

function App() {
  // State
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sample, setSample] = useState("");
  // Web3
  const [account, setAccount] = useState("");
  const [bal, setBal] = useState(10000);

  // Hooks
  // API and render as soon as page is loaded
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
        const date = new Date();
        console.log(date);
      })
      .catch((error) => console.log(error));
  }, [sample]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Methods
  const showData = (coin) => {
    // console.log(coin);
  };

  // Method to connect to the wallet
  // The method should be asynchronous for the user to be able to connect to the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("You have what you need ;)");
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // MetaMask requires requesting permission to connect users accounts
      await provider
        .send("eth_requestAccounts", [])
        .then((res) => {
          setAccount(res[0]);
          console.log("User has granted access to accounts");
        })
        .catch(() => {
          console.log("User has denied access to accounts");
        });

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner(0);

      console.log(signer);
    } else {
      console.log("No Ethereum browser detected");
    }
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <img
          className="header"
          src={require("./CC_header.png")}
          alt="logo"
        ></img>
        <WalletProfile />
        {/* Search Button element */}
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="coin-input"
          />
        </form>
      </div>
      <div className="btn-div">
        <button onClick={connectWallet} className="btn">
          Connect Wallet
        </button>
        <br />
      </div>
      <div className="wallet-info">
        <h5>Welcome to Crypto Collins , {account}</h5>
        <br></br>
        <p>Balance: ${bal}</p>
      </div>
      {filteredCoins.map((coin, index) => {
        return (
          <Coins
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            index={index}
            account={account}
            bal={bal}
            position={coin.position}
          />
        );
      })}
    </div>
  );
}
export default App;
