import Showweather from "./components/showweather";
import React from "react";
import { useState } from "react";


const Body = () => {
    const apikey=process.env.REACT_APP_API_KEY;
    let lat = "65";
    let lon = "65"
    let lang = "en";

    let [unit,setUnit]=useState('imperial');
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
            <div className="get-weatherforecast">
                <div className="titles">
                    Enter Latitude:<br />
                    Enter Longitude:<br />
                    Select units:<br />
                    Select Language:<br />
                </div>
                <div className="parameters">
                    <input type="text" className="input" placeholder="65" onChange={(e) => {
                        lat = e.target.value;
                    }}></input><br />
                    <input type="text" className="input" placeholder="65" onChange={(e) => {
                        lon = e.target.value;
                    }}></input><br />
                    <select className="input" onClick={(e) => {
                        setUnit(e.target.value);
                    }}>
                        {units.map(unitmapping)}
                    </select><br />
                    <select className="input" onClick={(e) => {
                        lang = e.target.value;
                    }}>
                        {langs.map(langmapping)}
                    </select><br />
                </div>
            </div>
            <button onClick={() => {
                fetchweather();
            }}>Get Weather</button>
            <div className="separator" />
            <div>
                {dataisloaded&&<Showweather unit={unit} Dataisloaded={dataisloaded} items={items} />}
            </div>
        </div>
    );
}

export default Body;

