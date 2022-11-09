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
  account,
  bal,
  buyCoinn,
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
  const [position, setPosition] = useState("");
  //For charts
  // const [chartData, setChartData] = useState({});

  // For purchase form
  const [amount, setAmount] = useState();
  const [time, setTime] = useState();

  //const url = "https://api.coingecko.com/api/v3/coins/";

  // Methods
  const coinClicked = async () => {
    // console.log(name);
    setCoin(name);
    setDisplay(true);

    const lowerCase = name.toLowerCase();

    const reqData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${lowerCase}`
    );
    // console.log(reqData.data);

    //api for charts
    //id,from,to
    // const from = 1667508894; // new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    // const to = 1667595294; // new Date()
    let currentDateObj = new Date();
    // console.log(currentDateObj);
    // const yesterdayDateObj = new Date(
    currentDateObj.setTime(currentDateObj.getTime() - 24 * 60 * 60 * 1000);
    // console.log(currentDateObj);
    // );
    // const numberOfMlSeconds = currentDateObj.getTime();
    // const addMlSeconds = 24 * 60 * 60 * 1000;
    // const newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    const toDateUnix = Math.floor(currentDateObj.getTime() / 1000);
    const fromDateUnix = toDateUnix - 24 * 60 * 60; //Math.floor(currentDateObj.getTime() / 1000);

    // console.log(currentDateObj);
    // console.log(fromDateUnix);
    // console.log(toDateUnix);

    const reqAPI = `https://api.coingecko.com/api/v3/coins/${lowerCase}/market_chart/range?vs_currency=usd&from=${fromDateUnix}&to=${toDateUnix}`;
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

  // Buy Coin
  const buyCoin = async (event) => {
    event.preventDefault();
    alert(`Your ${coin} purchase is complete`);
    // const newBalance = _balance - _amount;

    console.log(position);
    const _coin = name;
    // const _name = event.target.buy.value;
    const _account = account;
    const _amount = event.target.buy.value;
    const _position = event.target.position.value;
    const _time = new Date();

    const _price = price;
    const _balance = bal;

    const obj = {
      account: _account,
      coin: _coin,
      amount: _amount,
      position: _position,
      time: _time,
      currentPrice: _price,
      balance: _balance,
    };

    const reqAPi = "http://localhost:8011/purchase/create";

    const sending = await axios.post(reqAPi, obj);

    console.log(sending.data);

    buyCoinn(event);
  };

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
            <thead>
              <tr>
                <th>Rank</th>
                <th>24hr High</th>
                <th>24hr Low</th>
                <th>Total supply</th>
                <th>Circulating Supply</th>
                <th>All Time High</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rank}</td>
                <td>${dailyHigh}</td>
                <td>${dailyLow}</td>
                <td>{totalSupply}</td>
                <td>{circulatingSupply}</td>
                <td>${ath}</td>
              </tr>
            </tbody>
          </table>
          <h4 className="info">{stripTags(coin.description)}</h4>
          <form className="purchase" onSubmit={buyCoin}>
            <input type="number" name="buy" required />

            <input type="hidden" name="position" value="buy" />
            <input type="hidden" name="account" value={account} />
            <input type="hidden" name="coin" value={name} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="time" value={time} />
            <input type="hidden" name="currentPrice" value={price} />
            <input type="hidden" name="balance" value={bal} />
            <button className="button-86" type="submit">
              BUY
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Coins;
