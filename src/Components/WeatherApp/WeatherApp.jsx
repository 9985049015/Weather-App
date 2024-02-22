import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
const WeatherApp = () => {
  let api_key="3028c9f995215acd633e5311d6fcb539";
  const[wcon,setwcon]=useState(cloud_icon);
  const search=   async()=>{
       const element=document.getElementsByClassName("cityinput");
       if(element[0].value==="")
       {
          return 0;
       }
       
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
      let response=await fetch(url);
      let data=await response.json();

      const humidity=document.getElementsByClassName("humidity-percent");
      const wind=document.getElementsByClassName("wind-rate");
      const temparature=document.getElementsByClassName("weather-temp");
      const location=document.getElementsByClassName("weather-location");

      humidity[0].innerHTML=data.main.humidity;
      wind[0].innerHTML=data.wind.speed;
      temparature[0].innerHTML=Math.floor(data.main.temp)+'°C';
      location[0].innerHTML=data.name;

      if(data.main.temp>20)//data.weather[0].icon==="01d"||data.weather[0].icon==="01n"
      {
        setwcon(clear_icon);
      }
      else if(data.main.temp<20)//data.weather[0].icon==="10d"||data.weather[0].icon==="10n"
      {
        setwcon(rain_icon);
      }
      else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n")
      {
        setwcon(snow_icon);
      }
      else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n")
      {
        setwcon(drizzle_icon);
      }
  } 
  return (
    <div className='container'>
     <div className="top-bar">
      <input type="text" className="cityinput" placeholder='search'/>
      <div className="search-icon" onClick={()=>{search()} }>
        <img src={search_icon} alt=''/>
      </div>
     </div>

     <div className="weather-img">
      <img src={wcon} alt=''/>
     </div>
     <div className="weather-temp">21°C</div>
     <div className="weather-location">Bangalore</div>
     <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt='' className='icon'/>
        <div className="data">
          <div className="humidity-percent">64%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_icon} alt='' className='icon'/>
        <div className="data">
          <div className="wind-rate">18 km/h</div>
          <div className="text">Wind speed</div>
        </div>
      </div>
     </div>


    </div>
  )
}

export default WeatherApp;

