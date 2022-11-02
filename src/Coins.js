import React from 'react'
import './Coins.css'
export const Coins = ({name,image,symbol,price,volume, priceChange,marketcap}) => {


    const showDisplay = true;

return (
        <div className="coin-container">
            <div className="coin-row">
                {/* Coin div */}
                <div className="coin">
                    <img src={image} alt="crypto"/>

                    <h1>{name}</h1>

                    <p className="coin-symbol">{symbol}</p>

                </div>
                {/* Coin data div */}
                <div className="coin-data">
                    <p className="coin-price">${price}</p>

                    <p className="coin-volume">${volume.toLocaleString()}</p>
                    
                    {
                    priceChange < 0 ?(
                    <p className="coin-percent red">
                    {priceChange.toFixed(2)}%
                    </p>
                    ):(
                    <p className="coin-percent green">
                    {priceChange.toFixed(2)}%
                    </p>
                    )
                    }

                    <p className="coin-marketing">
                    Mkt Cap: ${marketcap.toLocaleString()}
                    </p>
                </div>
                {/* Extra Coin data for charts div */}
                {showDisplay ?(

                    <div className='row'>

                    <p>Charts</p>

                    </div>

                ): ""}
                
            </div>
        </div>
    )
}
export default Coins;