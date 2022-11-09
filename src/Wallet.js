import axios from "axios";
import React, { useCallback, useState } from "react";
import "./Wallet.css";

const WalletProfile = () => {
  return (
    <div className="wallet-container">
      <img
        className="avatar"
        src={require("./default_avatar.png")}
        alt="logo"
      ></img>
      <div className="wallet-profile">
        <h3>Wallet address</h3>
      </div>
    </div>
  );
};

export default WalletProfile;
