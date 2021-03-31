function Storage(city_name) {
  this.get_cities = function() {
    // Returns all cities names from localStorage
    let cities = [];

    for(let city_name in window.localStorage) {
      let prefix = city_name.substr(0, 'city_'.length);
      if (prefix == 'city_'){
        let suffix = city_name.substr('city_'.length);
        cities.push(suffix.toLowerCase());
      }
    }
    return cities;
  }

  this.add_city = function(city_name) {
    window.localStorage.setItem('city_' + city_name.toLowerCase(), 1);
  }

  this.remove_city = function(city_name) {
    window.localStorage.removeItem('city_' + city_name.toLowerCase());
  }

  this.is_stored = function(city_name) {
    let item = window.localStorage.getItem('city_' + city_name.toLowerCase());
    return (item === "1");
  }

  this.remove_all = function() {
    window.localStorage.clear();
  }
}
