import axios from "axios"
import { useEffect, useState } from "react"
import WeatherCard from "./components/WeatherCard"


function App() {

  const [cords, setCords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isCelsius, setIsCelsius] = useState(true)


  // Aqui obtenemos las coordenadas de las API del navegador
  // y las montamos en el estado

  const success = (pos) => {
    const newCords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCords(newCords)
  }

  const newCallApiSearch = (cityName) => {
    const API_KEY = "3d7d4f6b1f8cd183d6ffea41c77b3785"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
    .then(res => setWeather(res.data))
    .catch(err => alert("No se encontró este lugar"))
    
  }

  const changeTempUnit = () => setIsCelsius(!isCelsius)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  // ------------------- Peticion de los dato a la API del clima

  useEffect(() => {
    if (cords) {
      const API_KEY = "3d7d4f6b1f8cd183d6ffea41c77b3785"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9 / 5) + 32).toFixed(1)
          const newTemp = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTemp(newTemp)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [cords])


  return (
    <div className="App">
      {
        weather ? <WeatherCard
          weather={weather}
          temp={temp}
          changeTempUnit={changeTempUnit}
          isCelsius={isCelsius}
          newCallApiSearch={newCallApiSearch}
        />
          : <p>Loading...</p>
      }
    </div>
  )
}

export default App
