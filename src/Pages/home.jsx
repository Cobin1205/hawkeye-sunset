import Prediction from "../Components/Prediction.jsx"
import InfoBox from "../Components/InfoBox.jsx"
import TempIcon from "../assets/temperature.png"
import HumidityIcon from "../assets/humidity.png"
import AirQualityIcon from "../assets/air-quality.png"
import CloudCoverIcon from "../assets/forecast.png"
import Logo from "../assets/HawkeyeSunsetLogo.png"

import {Link} from "react-router-dom"
import {useEffect, useState} from "react"

export function Home(){
    
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://weather-worker.spicerice1205.workers.dev", {
          method: 'GET',
        })

        if(!res.ok){
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        setWeather(data)
      }

      catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
    fetchWeather();
  }, []);
  
  function humidityFactor(humidity) {
    if (humidity < 30) return 1;
    if (humidity < 60) return 0.75;
    if (humidity < 80) return 0.5;
    return 0;
  }
  
  function airQualityFactor(aqi) {
    if (aqi == 1) return 1;
    if (aqi == 2) return 0.75;
    if (aqi == 3) return 0.5;
    if (aqi == 4) return 0.25;
    return 0;
  }
  
  function cloudCoverFactor(cloudPercent) {
    if (cloudPercent < 10) return 0.2;
    if (cloudPercent < 30) return 0.5;
    if (cloudPercent < 70) return 1;
    if (cloudPercent < 90) return 0.5;
    return 0;
  }

  let score = null
  if(weather !== null){
    score = 
    (humidityFactor(weather.humidity) * 0.2 + airQualityFactor(weather.aqi) * 0.2 + cloudCoverFactor(weather.cloudCoverage) * 0.6) * 10
  }

  return (
    <>
      <ul className="navbar">
        <img src={Logo} className="logo"></img>
        <Link to="/"><strong>Home</strong></Link>
        <Link to="/about">About</Link>
        <Link to="/feedback">Feedback</Link>
      </ul>

      <div className="container">
        <Prediction score={Math.round(score)} time={weather ? weather.sunsetTime : "Loading..."}/>

        <div className="info-panels">
            <InfoBox icon={TempIcon} label="Temperature" info={weather ? weather.temperature : "Loading..."} unit="°F" />
            <InfoBox icon={HumidityIcon} label="Humidity" info={weather ? weather.humidity : "Loading..."} unit="%" />
            <InfoBox icon={AirQualityIcon} label="Air Quality (AQI)" info={weather ? weather.aqi : "Loading..."} />
            <InfoBox icon={CloudCoverIcon} label="Cloud Coverage" info={weather ? weather.cloudCoverage : "Loading..."} unit="%" />
        </div>

      </div>
    </>
  );
}