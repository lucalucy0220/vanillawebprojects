import React from 'react';

function Weather({country, city, temperature, humidity, condition}) {
    return (
        <div>
            {country && city && <p>Location: {city}, {country}</p>}
            {temperature && <p>Temperature: {temperature}</p>}
            {humidity && <p>Humudity: {humidity}</p>}
            {condition && <p>Condition: {condition}</p>}
        </div>
    )

}

export default Weather;