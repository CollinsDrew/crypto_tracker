import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coins from "./Coins";

function App() {
  // State
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sample, setSample] = useState("");
  // const timer = setTimeout(() => {
  //   console.log('This will run after 1 second!')
  // }, 300000);

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

  return (
    <div className="coin-app">
      <div className="coin-search">
        <img
          className="header"
          src={require("./CC_header.png")}
          alt="logo"
        ></img>

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
          />
        );
      })}
    </div>
  );
}
export default App;
