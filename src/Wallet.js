import axios from "axios";
import React, { Profiler, useEffect, useState } from "react";
import "./Wallet.css";

const WalletProfile = (props) => {
  const address = props.account;
  const [api, setApi] = useState([]);

  const all = props.all;

  useEffect(() => {
    axios
      .get(`http://localhost:8011/account?account=${address}`)
      .then((res) => {
        // console.log(res.data);
        const resData = res.data;
        setApi(() => resData);
        console.log(resData);
      })
      .catch((error) => console.log(error));
    // setApi(all);
  }, [address]);

  console.log(api[api.length - 1]?.balance);
  //   console.log(all);
  return (
    <div className="wallet-container">
      <h3>Balance: ${api[api.length - 1]?.balance}</h3>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Total Purchase Value</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {api.map((value) => {
            return (
              <tr>
                <td>{value.coin}</td>
                <td>${value.amount}</td>
                <td>${value.currentPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WalletProfile;
