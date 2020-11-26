import logo from './logo.svg';
import './App.css';
import React from 'react';
import Weather from "./components/weather";
import Form from "./components/form";

function App() {
    const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

    const [city, setCity] = React.useState(undefined);
    const [country, setCountry] = React.useState(undefined);
    const [temperature, setTemperature] = React.useState(undefined);
    const [humudity, setHumudity] = React.useState(undefined);
    const [condition, setCondition] = React.useState(undefined);

    const getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)
        const response = await api_call.json();
        console.log(response);
        if (city && country) {
            setTemperature(response.main.temp);
            setCity(response.name);
            setCountry(response.sys.country);
            setHumudity(response.main.humidity);
            setCondition(response.weather[0].description);
        }
    }

    return (
        <div className="App">
            <Form getWeather={getWeather}/>
            <Weather country={country}
                     city={city}
                     temperature={temperature}
                     humidity={humudity}
                     condition={condition}
            />
        </div>
    );
}

export default App;