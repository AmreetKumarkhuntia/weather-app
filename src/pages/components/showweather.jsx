const showweather = (props) => {
    var items = props.items.data;
    
    function weathercardmapping(items){
        var logo_url = "https://www.weatherbit.io/static/img/icons/" + items.weather.icon + ".png";
        return(
            <div className="weathercard">
            <img src={logo_url} alt="weather_logo"></img> <br />
            <h3>
                {items.weather.description}
            </h3>
            <br />
            <h5>Temperature :</h5> {items.app_temp} F<br />
            <h5>Date and Time :</h5> {items.datetime}<br />
            <h5>Clouds :</h5> {items.clouds}
        </div>
        )
    }

    return (
        <div  className="show-weatherforecast">
            <div className="details">
                <div className="subheader">
                    city
                </div>
                <h1>{props.items.city_name}
                </h1>
                <div className="country_details">
                    <ul>
                        <li>COUNTRY CODE : {props.items.country_code}</li>
                        <li>TIMEZONE : {props.items.timezone}</li>
                        <li>STATE CODE : {props.items.state_code}</li>
                    </ul>
                </div>
            </div>
            <h1 className="card_title">
                3 Hour Interval - 5 Day Forecast
            </h1>
            <div className="cards">
                    {items.map(weathercardmapping)}
            </div>
        </div>
    );
}

export default showweather;