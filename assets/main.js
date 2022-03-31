//Comprehensive list of variables//
var cityHistory = JSON.parse(localStorage.getItem("history")) || [];
const cityName = document.getElementById("cityName");
const newName = document.getElementById("cityInput");
const todayDate = document.getElementById("timeDis");
var forecast0 = document.getElementById("forecast0");
var forecast1 = document.getElementById("forecast1");
var forecast2 = document.getElementById("forecast2");
var forecast3 = document.getElementById("forecast3");
var forecast4 = document.getElementById("forecast4");
const city = document.getElementById("city");

//For loop for search history//
function printHistory() {
	for (var i = 0; i < cityHistory.length; i++) {
		var element = document.createElement("p");
		element.textContent = cityHistory[i];
		//event listener for cities in local storage on click//
		element.addEventListener("click", function (event) {
			getInfo(event.target.textContent);
		});
		cityName.append(element);
		element.style.border = "solid rgb(31, 82, 82)";
		element.addEventListener("mouseover", function (event) {
			// highlight the mouseover target
			event.target.style.color = "orange";
			setTimeout(function () {
				event.target.style.color = "";
			}, 500);
		});
	}
}

function getInfo(newName) {
	// Collects data from input field //
	// Displays data enterred to input //
	if (!newName) {
		newName = document.getElementById("cityInput").value;
	}
	cityHistory = JSON.parse(localStorage.getItem("history")) || [];
	cityHistory.push(newName);
	localStorage.setItem("history", JSON.stringify(cityHistory));
	cityName.innerHTML = "--" + newName + "--";
	//Passing the API key & city name//
	fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName + "&appid=3649b0b86df7a1e0a5f6def57b72b739&units=metric")
		//Javascript promise that will return the data//
		.then((Response) => Response.json())
		.then((data) => {
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min).toFixed(1) + "°C";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max).toFixed(2) + "°C";
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Humidity").innerHTML = "Humidity:" + Number(data.list[i].main.humidity).toFixed(1);
			}
			for (i = 0; i < 5; i++) {
				document.getElementById("day" + (i + 1) + "Wind").innerHTML = "Wind:" + Number(data.list[i].wind.speed).toFixed(1);
			}
			document.getElementById("currentDay").innerHTML = " " + Number(data.list[i].main.temp_max).toFixed(2) + "°C";
			document.getElementById("currentWind").innerHTML = " " + Number(data.list[i].wind.speed).toFixed(1);
			document.getElementById("currentHumidity").innerHTML = Number(data.list[i].main.humidity).toFixed(1);
			//Loops through list to find selected icon//
			for (i = 0; i < 5; i++) {
				document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
			}
			//API for current UVI rating//
			fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&appid=3649b0b86df7a1e0a5f6def57b72b739")
				.then((Response) => Response.json())
				.then((data) => {
					document.getElementById("currentUV").innerHTML = " " + Number(data.current.uvi).toFixed(1);
					if (data.current.uvi > 3) {
						document.getElementById("currentUV").style.backgroundColor = "orange";
					} else if (data.current.uvi < 3) {
						document.getElementById("currentUV").style.backgroundColor = "green";
					} else if (data.current.uvi > 6) {
						document.getElementById("currentUV").style.backgroundColor = "red";
					}
				});
		});
	//Error response//
	try {
	} catch (error) {
		alert("something went wrong");
	}

	// //Method to set current date
	todayDate.textContent = moment().format("L");
	//Method to set future date
	forecast0.textContent = moment().add(1, "days").format("L");
	forecast1.textContent = moment().add(2, "days").format("L");
	forecast2.textContent = moment().add(3, "days").format("L");
	forecast3.textContent = moment().add(4, "days").format("L");
	forecast4.textContent = moment().add(5, "days").format("L");
	//Calls history//
	printHistory();
}
