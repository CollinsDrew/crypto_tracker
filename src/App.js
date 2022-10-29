import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';


function App() {

  const [coins,setCoins]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(res=>{
    setCoins(res.data);
    console.log(res.data);
    }).catch(error=>console.log(error));
    },[]);

    const handleChange = change => {
      setSearch(change.taget.value);
    }

    const filteredCoins=coins.filter(coin=>
      coin.name.toLowerCase().includes(search.toLowerCase())
      )

  return (
    
    <div className="App">
      <header className="App-header">
      </header>
    </div>

  );
}

export default App;
