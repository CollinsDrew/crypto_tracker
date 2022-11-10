import axios from "axios";
import React, { Profiler, useEffect, useState } from "react";
import "./Wallet.css";

const WalletProfile = (props) => {
  const address = props.account;

  const all = props.all;

  useEffect(() => {
    axios
      .get(
        `https://crypto-collins-api.netlify.app/.netlify/functions/api/account?account=${address}`
      )
      .then((res) => {
        // console.log(res.data);
        const resData = res.data;
        let newBalance = props.bal;
        for (let i = 0; i < res.data.length; i++) {
          newBalance = newBalance - res.data[i].amount;
        }
        props.setBal(newBalance);
        props.setApi(() => resData);
        console.log(resData);
      })
      .catch((error) => console.log(error));
    // setApi(all);
  }, [address]);

  //   console.log(props.api[props.api.length - 1]?.balance);
  //   console.log(all);
  return (
    <div className="wallet-container">
      <h3> Balance: ${props.bal}</h3>
      {/* <h3> Balance: ${props.api[props.api.length - 1]?.balance}</h3> */}
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Purchase Value</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {props.api.map((value) => {
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
