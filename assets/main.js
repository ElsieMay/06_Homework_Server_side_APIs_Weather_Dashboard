function getInfo() {
	// Collects data from input field //
	const newName = document.getElementById("cityInput");
	const cityName = document.getElementById("cityName");
	// Displays data enterred to input //
	cityName.innerHTML = "--" + newName.value + "--";
	//Passing the API key & city name//
	fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&appid=3649b0b86df7a1e0a5f6def57b72b739")
		//Javascript promise that will return the data//
		.then((Response) => Response.json())
		.then((data) => {
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Humidity").innerHTML = "Humidity:" + Number(data.list[i].main.humidity - 62).toFixed(1);
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Wind").innerHTML = "Wind:" + Number(data.list[i].wind.speed - 3.25).toFixed(1);
			}
			//Loops through list to find selected icon//
			for (i = 0; i < 5; i++) {
				document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
			}
		});

	try {
	} catch (error) {
		alert("something went wrong");
	}
}

const daySelection = new Date();
//Array of all days of the week//
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Finds correct integer for index of days in array//
function dayCheck(day) {
	if (day + daySelection.getDay() > 6) {
		return day + daySelection.getDay() - 7;
	} else {
		return day + daySelection.getDay();
	}
}
//Loops through list to find selected day in week//
for (i = 0; i < 5; i++) {
	document.getElementById("day" + (i + 1)).innerHTML = weekday[dayCheck(i)];
}
