import axios from "axios";
import React, { Profiler, useEffect, useState } from "react";
import "./Wallet.css";

const WalletProfile = (props) => {
  const address = props.account;
  const [api, setApi] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8011/account?account=${address}`)
      .then((res) => {
        // console.log(res.data);
        const resData = res.data;
        setApi(resData);
      })
      .catch((error) => console.log(error));
  }, [address]);

  console.log(api);

  return (
    <div className="wallet-container">
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
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
