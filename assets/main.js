var cityHistory = JSON.parse(localStorage.getItem("history")) || [];
const cityName = document.getElementById("cityName");
const newName = document.getElementById("cityInput");
const todayDate = document.getElementById("timeDis");
const futureDay = document.querySelectorAll("futureDate");

for (var i = 0; i < cityHistory.length; i++) {
	var element = document.createElement("p");
	element.textContent = cityHistory[i];
	const city = document.getElementById("city");
	cityName.append(city);
}

function getInfo() {
	// Collects data from input field //
	// Displays data enterred to input //
	cityHistory = JSON.parse(localStorage.getItem("history")) || [];
	cityHistory.push(newName.value);
	localStorage.setItem("history", JSON.stringify(cityHistory));
	cityName.innerHTML = "--" + newName.value + "--";
	//Passing the API key & city name//
	fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&appid=3649b0b86df7a1e0a5f6def57b72b739")
		//Javascript promise that will return the data//
		.then((Response) => Response.json())
		.then((data) => {
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min - 0).toFixed(1) + "°F";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max - 0).toFixed(2) + "°F";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Humidity").innerHTML = "Humidity:" + Number(data.list[i].main.humidity - 0).toFixed(1);
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Wind").innerHTML = "Wind:" + Number(data.list[i].wind.speed - 0).toFixed(1);
			}
			document.getElementById("currentDay").innerHTML = " " + Number(data.list[i].main.temp_max - 0).toFixed(2) + "°F";
			document.getElementById("currentWind").innerHTML = " " + Number(data.list[i].wind.speed - 0).toFixed(1);
			document.getElementById("currentHumidity").innerHTML = Number(data.list[i].main.humidity - 0).toFixed(1);
			//Method to set current date
			const currentDate = new Date(data.list[i].dt * 1000);
			const currentDay = currentDate.getDate();
			const currentMonth = currentDate.getMonth();
			const currentYear = currentDate.getFullYear();
			todayDate.innerHTML = " (" + currentMonth + "/" + currentDay + "/" + currentYear + ") ";
			//Method to set future date
			const futureDate = new Date(data.list[i].dt * 1000);
			const futureD = futureDate.getDate();
			const futureM = futureDate.getMonth();
			const futureY = futureDate.getFullYear();
			const futureDay = document.createElement("p");
			futureDay.setAttribute("class", "mt-3 mb-0 futureDay");
			futureDay.innerHTML = " (" + futureM + "/" + futureD + "/" + futureY + ") ";
			//Loops through list to find selected icon//
			for (i = 0; i < 5; i++) {
				document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
			}

			fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&appid=3649b0b86df7a1e0a5f6def57b72b739")
				.then((Response) => Response.json())
				.then((data) => {
					document.getElementById("currentUV").innerHTML = " " + Number(data.current.uvi - 0).toFixed(1);
					if (data.current.uvi > 3) {
						document.getElementById("currentUV").style.backgroundColor = "orange";
					} else if (data.current.uvi < 3) {
						document.getElementById("currentUV").style.backgroundColor = "yellow";
					} else if (data.current.uvi > 6) {
						document.getElementById("currentUV").style.backgroundColor = "red";
					}
				});
		});
	try {
	} catch (error) {
		alert("something went wrong");
	}
}
