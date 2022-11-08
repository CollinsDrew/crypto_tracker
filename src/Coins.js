import axios from "axios";
import React, { useCallback, useState } from "react";
import "./Coins.css";
import { Line } from "react-chartjs-2";
//import { setLabels } from "react-chartjs-2/dist/utils";
import LineChart from "./LineChart";

export const Coins = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
  index,
}) => {
  const [display, setDisplay] = useState(false);
  const [coin, setCoin] = useState("");
  // From the apis
  const [rank, setRank] = useState();
  const [description, setDescription] = useState();
  const [dailyHigh, setDailyHigh] = useState();
  const [dailyLow, setDailyLow] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [circulatingSupply, setCirculatingSupply] = useState();
  const [ath, setAth] = useState();
  const [lab, setLab] = useState([]);
  //For charts
  // const [chartData, setChartData] = useState({});

  //const url = "https://api.coingecko.com/api/v3/coins/";

  // Methods
  const coinClicked = async () => {
    console.log(name);
    setCoin(name);
    setDisplay(true);

    const lowerCase = name.toLowerCase();

    const reqData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${lowerCase}`
    );
    // console.log(reqData.data);

    //api for charts
    //id,from,to
    const from = 1667508894;
    const to = 1667595294;
    const reqAPI = `https://api.coingecko.com/api/v3/coins/${lowerCase}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
    //`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1667508894&to=1667595294`

    const hourly = await axios.get(reqAPI);

    setLab(hourly.data.prices);

    // Data for info drop box when a single coin is clicked
    const _rank = reqData.data.coingecko_rank;
    const _description = reqData.data.description.en;
    const _dailyHigh = reqData.data.market_data.high_24h.usd;
    const _dailyLow = reqData.data.market_data.low_24h.usd;
    const _totalSupply = reqData.data.market_data.total_supply;
    const _circulatingSupply = reqData.data.market_data.circulating_supply;
    const _ath = reqData.data.market_data.ath.usd;

    setRank(_rank);
    setDescription(_description);
    setDailyHigh(_dailyHigh);
    setDailyLow(_dailyLow);
    setTotalSupply(_totalSupply);
    setCirculatingSupply(_circulatingSupply);
    setAth(_ath);
  };

  // Strips href tags from API
  function stripTags(input) {
    const doc = new DOMParser().parseFromString(description, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <div className="coin-container" onClick={coinClicked}>
      <div className="coin-row">
        {/* Coin div */}
        <div className="coin">
          <img src={image} alt="crypto" />

          <h1>{name}</h1>

          <p className="coin-symbol">{symbol}</p>
        </div>
        {/* Coin data div */}
        <div className="coin-data">
          <p className="coin-price">${price}</p>

          {/* <p className="coin-volume">${volume.toLocaleString()}</p> */}

          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}

          <p className="coin-marketing">
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
        </div>

        {/* Extra Coin data for charts div */}
      </div>

      {display ? (
        <div className="row extra-box">
          <LineChart chartData={lab} />
          {/* <br></br>
          <h6 className="info"> Rank: {rank}</h6>
          <br></br>
          <h6 className="info"> 24hr High: ${dailyHigh}</h6>
          <br></br>
          <h6 className="info"> 24hr Low: ${dailyLow}</h6>
          <br></br>
          <h6 className="info"> Total Supply: {totalSupply}</h6>
          <br></br>
          <h6 className="info"> Circulating Supply: {circulatingSupply}</h6>
          <br></br>
          <h6 className="info"> All Time High: ${ath}</h6>
          <br></br>
          <h4 className="info">{description}</h4> */}
          <table>
            <tr>
              <th>Rank</th>
              <th>24hr High</th>
              <th>24hr Low</th>
              <th>Total supply</th>
              <th>Circulating Supply</th>
              <th>All Time High</th>
            </tr>
            <tr>
              <td>{rank}</td>
              <td>${dailyHigh}</td>
              <td>${dailyLow}</td>
              <td>{totalSupply}</td>
              <td>{circulatingSupply}</td>
              <td>${ath}</td>
            </tr>
          </table>
          <h4 className="info">{stripTags(coin.description)}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Coins;
