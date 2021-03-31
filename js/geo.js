function request_coords(cb_success, cb_reject) {
  navigator.geolocation.getCurrentPosition(function(coords){
    let lat = coords['coords']['latitude'];
    let lon = coords['coords']['longitude'];
    cb_success(lat, lon);
  }, cb_reject);
}

function _query(url, cb, cb_error){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data['cod'] == 404){
      alert('В api нет такого города(');
      throw 1;
    }
    cb({wind_speed: data['wind']['speed'],
        wind_deg: data['wind']['deg'],
        clouds: data['clouds']['all'],
        pressure: data['main']['pressure'],
        humidity: data['main']['humidity'],
        lon: data['coord']['lon'],
        lat: data['coord']['lat'],
        city: data['name'],
        icon: 'http://openweathermap.org/img/wn/'+data['weather'][0]['icon']+'@4x.png',
        temp: Math.round(data['main']['temp'] - 272.15)});
  })
  .catch(err => {
    console.log('some err. Setting attention sign');
    if (err == 'TypeError: Failed to fetch'){
      alert('Проблемы с интернетом!');
    }
    cb_error();
  })
}

function WeatherAPI() {
  key = "4e78cac93be94d53bf5bcab847fb390c";
  base_url = "https://api.openweathermap.org/data/2.5/weather";

  this.get_by_city = function(city_name, cb, cb_error){
    _query(base_url + "?q="+city_name+"&appid="+key+"&lang=ru", cb, cb_error)
  }

  this.get_by_coords = function(lat, lon, cb, cb_error){
    _query(base_url + "?lat="+lat+"&lon="+lon+"&appid="+key+"&lang=ru", cb, cb_error)
  }
}
