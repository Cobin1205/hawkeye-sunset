/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    function convertTo24Hr(timeStr) {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    try {
      const city = "Iowa City";
      const apiKey = env.API_KEY;

      // Get forecast
      const forecastRes = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=no`
      );
      const forecastData = await forecastRes.json();

      const forecast = forecastData.forecast.forecastday[0];
      const sunset = forecast.astro.sunset;
      const hourly = forecast.hour;

      const sunsetHour = new Date(`1970-01-01T${convertTo24Hr(sunset)}:00`).getHours();
      const sunsetData = hourly.find(
        (h) => new Date(h.time).getHours() === sunsetHour
      ) || hourly[0];

      // Get AQI
      const aqiRes = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
      );
      const aqiData = await aqiRes.json();
      const aqi = aqiData.current.air_quality?.["us-epa-index"] || "N/A";

      return new Response(JSON.stringify({
        sunsetTime: sunset,
        temperature: Math.round(sunsetData.temp_f),
        humidity: sunsetData.humidity,
        cloudCoverage: sunsetData.cloud,
        aqi,
      }), {
        headers: {
          "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json"
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "API request failed" }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }
  }
};