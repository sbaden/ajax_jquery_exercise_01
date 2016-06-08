/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Bonus 1: add a form prompting user for the city and state.
- Bonus 2: convert answer from kelvin to fahrenheit.

*/

(function(){
	var apiKey = '6987be120e411e10219df3b69a8edc5c';
	var city = 'rome,it';
	var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city;
	var unit = 'metric';


	$.ajax({
		url: url+ '&appid='+apiKey + '&units='+ unit,
		type: 'GET',
		success: function(response){
			console.log(response);
			console.log(response.list.length);
			console.log(response.list[1].main.temp);
		},
		error: function(response){
			console.log(response);
		}
	});
})();
