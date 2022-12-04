import React, { useState } from 'react'

const WeatherCard = ({weather, temp, isCelsius, changeTempUnit, newCallApiSearch}) => {
    const [place, setPlace] = useState("")
    const handleChange = (e)=> {
        setPlace(e.target.value)
    }

    return (
    <article className='card' >
        <h1>Weather App</h1>
        <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
        <section className='card-body'>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
            <ul>
                <li><span className='data-d'>{weather.weather[0].description}</span></li>
                <li> <span className='data'> Velocidad del viento: </span> {weather.wind.speed} m/s</li>
                <li> <span className='data'>Nubosidad:</span> {weather.clouds.all} %</li>
                <li> <span className='data'>Presion:</span> {weather.main.pressure} hPa</li>
            </ul>
        </section>
        <p>{isCelsius ? `${temp.celsius} °C`: `${temp.fahrenheit} °F`}</p>
        <button className='card-button' onClick={changeTempUnit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Grados °F/°C</button>
        <section className='wheaterCard-footer'>
            <input onChange={handleChange} value={place} type="text" />
            <button className='card-button' onClick={()=> newCallApiSearch(place)} >
                <span></span><span></span><span></span><span></span>
                Search</button>
        </section>
    </article>
    )
}

export default WeatherCard