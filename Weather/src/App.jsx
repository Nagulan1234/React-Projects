import './App.css';
/* IMAGES */
import searchIcon from './assets/loupe.png';
import clearIcon from './assets/clear.png';
import clodIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import windIcon from './assets/wind.png';
import snowIcon from './assets/winter.png';
import humidityIcon from './assets/humidity.png';
import { useEffect, useState } from 'react';
import rainIcon from './assets/raining.png';
function WeatherDetails({icon,temp,city,contary,lat,log,humidity,wind}){
  return(
    <>
    <div className='image'>
      <img src={icon} alt="image"/>
    </div>
    <div className='temp'>{temp}*C</div>
    <div className='location'>{city}</div>
    <div className='contary'>{contary}</div>
    <div className='coard'>
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>Longtitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='humi-win'>
      <div className='element'>
        <img src={humidityIcon} alt="" className='humi-icon'/>
      <div className='data'>
        <div className='humidity-percentage'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt="wind" className='wind-icon'/>
      <div className='data'>
        <div className='wind-percentage'>{wind}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
      </div>
    </div>
    </>
  )

}

function App() {
  let api_key="c98ad1a69ee3cf33a98cd11ac9ca4425"
  const[text,setText]=useState("Chennai");
  const[icon,setIcon]=useState(clearIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("");
  const[contary,setContary]=useState("");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap ={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":clodIcon,
    "02n":clodIcon,
    "03d":clearIcon,
    "03n":clearIcon,
    "04d":clearIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }
  const search=async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod==="404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setContary(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconcode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || clearIcon);
      setCityNotFound(false);

    }catch(error){
      console.error(error.message);
      setError("Error Occured In While fetching Data");

    }finally{
      setLoading(false);

    }
  }
  function handlecity(e){
    setText(e.target.value)
  };
  function handlekeydown(e){
    if(e.key ==="Enter"){
      search();
    }

  }
  useEffect(function(){
    search();
  },[]);

  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type='text'
        className='cityinput'
        placeholder='search city' 
        onChange={handlecity}
        value={text}
        onKeyDown={handlekeydown}/>
        <div className='icon'>
          <img src={searchIcon} alt='Image'onClick={()=>search()}/>
        </div>
      </div>
     {loading && <div className='loading-message'>Loading...</div>}
     {error && <div className='error-message'>{error}</div>}
     {cityNotFound && <div className='city-not-found'>City Not Found</div>}
     {!loading && !cityNotFound && <WeatherDetails  
      icon={icon} 
      temp={temp} 
      city={city}
      contary={contary}
      lat={lat}
      log={log}
      humidity={humidity}
      wind={wind}
      />}
      {/* <footer>
      <p className='copyright'>
        Desinged by <span>NAGULAN</span>
      </p>
      </footer> */}
    </div>
    
    </>
  )
}

export default App
