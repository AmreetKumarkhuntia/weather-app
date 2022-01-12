import Showweather from "./components/showweather";
import React from "react";
import { useState } from "react";


const Body = () => {
    const apikey = process.env.REACT_APP_API_KEY;
    let lang = "en";

    const [lat,setLat]=useState("28.6139");
    const [lon,setLon]=useState("77.2090");

    let [unit, setUnit] = useState('imperial');
    const units = ["imperial", "metric"];
    const langs = ["en", "ar", "az", "be"];

    let [dataisloaded, setDataisloaded] = useState(false);
    let [items, setItems] = useState([]);

    function unitmapping(units) {
        return (
            <option value={units} >
                {units}
            </option>
        )
    }
    function langmapping(langs) {
        return (
            <option value={langs}>
                {langs}
            </option>
        )
    }
    function fetchlocation(){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                alert("Current latitude set to "+lat+" and longitude to "+ lon);
              });
          } else {
            alert("Geo Tracker is not Available");
          }

    }
    function fetchweather() {
        var url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=";
        url = url.concat(lat, "&lon=", lon, "&units=", unit, "&lang=", lang)
        var object = {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
                'x-rapidapi-key': apikey,
                useQueryString: true
            }
        }
        fetch(url, object).then((res) => {
            return res.json();
        }).then((item) => {
            setItems(item);
            setDataisloaded(true);
        })
    }
    return (
        <div className="weather">
            <h1 className="parameter_title">ENTER PARAMETERS</h1>
            <table className="get-weatherforecast">
                <tr>
                    <td className="titles">Enter Latitude:</td>
                    <td className="parameters">
                        <input type="text" className="input" placeholder={lat} onChange={(e) => {
                            setLat(e.target.value);
                        }} />
                    </td>
                </tr>
                <tr>
                    <td className="titles">Enter Longitude:</td>
                    <td className="parameters" >
                        <input type="text" className="input" placeholder={lon} onChange={(e) => {
                            setLon(e.target.value);
                        }} />
                    </td>
                </tr>
                <tr>
                    <td className="titles">Select units:</td>
                    <td className="parameters">
                        <select className="input" onClick={(e) => {
                            setUnit(e.target.value);
                        }}>
                            {units.map(unitmapping)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className="titles">Select Language:</td>
                    <td className="parameters">
                        <select className="input" onClick={(e) => {
                            lang = e.target.value;
                        }}>
                            {langs.map(langmapping)}
                        </select>
                    </td>
                </tr>

            </table>
            <div className="div-button">
                <button onClick={()=>{
                    fetchlocation();
                }} >
                    Get Location
                </button>
                <button onClick={() => {
                    fetchweather();
                }}>Get Weather</button>
            </div>
            {dataisloaded && <div className="separator" />}
            {dataisloaded && <Showweather unit={unit} Dataisloaded={dataisloaded} items={items} />}
        </div>
    );
}

export default Body;

