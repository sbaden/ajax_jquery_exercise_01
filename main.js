/*

- Sign up for openweathermap.org: generate API key.
- $.ajax or $.get to pull weather data.
  	(hint: http://api.openweathermap.org/data/2.5/weather?q=...)
- console.log(temperature)
- Bonus 1: prompt user for city and state.
- Bonus 2: get units in fahrenheit.

*/

(function(){

	$('#get-weather').on('click', function(){
		var $city = $('#city-search');
		
		if(!$city.val().trim()){
			alert('Please enter a city and country code');
		}
		else{ console.log($city);
			var apiKey = '6987be120e411e10219df3b69a8edc5c';
			// var city = 'los angeles,us';
			var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + $city.val();
			var unit = 'Imperial';  // Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit


			$.ajax({
				url: url+ '&appid='+apiKey + '&units='+ unit,
				type: 'GET',
				success: function(response){
					passWeatherData(response);
				},
				error: function(response){
					console.log(response);
				}
			});
		}
		$city.val('');
	});

})();

function passWeatherData(data){ console.log(data);
	var templateSource = $('#weather-template').html(); // Reference html template
	var template = Handlebars.compile(templateSource); // Compile template w/Handlebars

	for(var i=0; i<data.list.length; i++){
		var dateTime = new Date(data.list[i].dt_txt);
		console.log(dateTime.getHours());

		var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
			'Thursday', 'Friday', 'Saturday'];
		var monthArray = ['January', 'February', 'March', 'April', 'May',
			'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var dateTimeObj = {
			dayOfWeek: dayArray[dateTime.getDay()],
			month: monthArray[dateTime.getMonth()],
			day: dateTime.getDate(),
			year: dateTime.getFullYear(),
			hour: dateTime.getHours(),
			min: dateTime.getMinutes()
		}

		var minAdj = (dateTimeObj >= 10 ? dateTimeObj.min : '0'+dateTimeObj.min);
		var time = dateTimeObj.hour + ':' + minAdj;

		dateTime = dateTimeObj.dayOfWeek+', ' + dateTimeObj.month +' '+ dateTimeObj.day +', ' +dateTimeObj.year +' '+ time;

		var iconID = data.list[i].weather[0].icon;
		var iconURL = "http://www.openweathermap.org/img/w/" + iconID + ".png"

		var weather = { // Define data obj
			date:  dateTime,
			icon:  iconURL,
			description: data.list[i].weather[0].description,
			temp:  'Temperature ',
			tempLow:  Math.floor(data.list[i].main.temp_min),
			tempHigh:  Math.floor(data.list[i].main.temp_max),
			humidity:  'Humidity ' + Math.floor(data.list[i].main.humidity),
			wind: 'Wind ',
			windDir: Math.floor(data.list[i].wind.deg) + ' degrees',
			windSpeed: ' at ' + Math.floor(data.list[i].wind.speed) + ' mph'
		}

		var readyTemplate = template(weather);// Pass data obj to template
		$('body').append(readyTemplate);  // Append DOM
	}
}










