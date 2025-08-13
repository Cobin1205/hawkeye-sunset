const PORT = 8000

const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(cors())

app.get('/weather', async (req, res) => {

    //Convert to compatible format with the weather API
    function convertTo24Hr(timeStr){
        const [time, period] = timeStr.split(" ")
        let [hours, minutes] = time.split(":").map(Number)
        if(period === "PM" && hours !== 12) hours += 12
        if(period === "AM" && hours !== 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    }
    
    //Get the data from the last API call
    try {
        //Get the forecast weather in Iowa City
        const city = "Iowa City"
        const apiKey = process.env.API_KEY
        const forecastRes = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=no`)

        //Get the forecast at the specific hour
        const forecast = forecastRes.data.forecast.forecastday[0]
        //Get the hour of the sunset (in 24-hour)
        const sunset = forecast.astro.sunset 
        //get the hourly forecast information
        const hourly = forecast.hour 

        //Convert the desired sunset hour into 24 hour time
        const sunsetHour = new Date(`1970-01-01T${convertTo24Hr(sunset)}:00`).getHours()
        //Get the weather data from the sunset hour
        const sunsetData = hourly.find((h) => new Date(h.time).getHours() === sunsetHour) || hourly[0]

        //Get the AQI information
        const aqiRes = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
        const aqi = aqiRes.data.current.air_quality?.["us-epa-index"] || "N/A"

        res.json({
            sunsetTime: sunset,
            temperature: Math.round(sunsetData.temp_f),
            humidity: sunsetData.humidity,
            cloudCoverage: sunsetData.cloud,
            aqi,
        })
    
        } catch (error) {
            console.error("API request failed:", error)
    }
  
}, [])

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))