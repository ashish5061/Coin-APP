
import './App.css';
import React from 'react';
import Dashboard from './dashboard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useState,useEffect } from 'react';

const axios = require('axios').default;

function App() {
  const [graph, setGraph] = useState([])

  // Make a request for a user with a given ID
  const fetchData = () => {
    return (
      axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        // handle success
        return response
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
    )
  }

  useEffect(() => {
    function apiCall(){
      fetchData().then((res) => {
        const formattedData = Object.values(res.data.bpi).map((data) => {
          data.rate = parseInt(data.rate) * 1000;
  
          return data;
        });
        setGraph(formattedData)
      })
    }
    setInterval(() => apiCall()
   ,10000)
   apiCall()
  },[])

  
    return (
      
      <div className='flex flex-col items-center justify-center w-full min-w-screen my-14' style={{minWidth: "100vw"}} >

      <Dashboard 
      data = {graph}
      />
      <BarChart
      className='my-14'
      width={500}
      height={300}
      data={graph}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="code" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="rate" fill="#8884d8" />
      <Bar dataKey="rate_float" fill="#82ca9d" />
    </BarChart>
    </div>
      
      
    );
}

export default App;

