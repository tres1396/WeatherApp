//create search history
$(document).ready(function () {
    var cityInputEl = $("#city-input");


    var printSearchHistory = function (city) {
        var searchHistoryDiv = $("#search-history");

        var searchInputEl = $("<div>");
        searchInputEl.addClass("col-12 col-sm-4 col-md-3")

        var searchEl = $("<div>");
        searchEl.addClass("list-group");
        searchEl.appendTo(searchInputEl);

        var searchItem = $("<li>").addClass("list-group-item").text(city)
        searchItem.appendTo(searchEl);

        searchHistoryDiv.append(searchInputEl);
    }

    var handleFormSubmit = function (event) {
        event.preventDefault();
        var cityInput = cityInputEl.val();

        if (!cityInput) {
            alert("Please enter a city!");
            return
        }
        getApi(cityInput)
        printSearchHistory(cityInput);
        //reset form
        cityInputEl.val("")

        function populateStorage() {
            localStorage.setItem(cityInput)
        }
    }
    $("#button-addon2").on("click", handleFormSubmit);
})

//fetch API data
function getApi(city) {
    var apiKey = "38128371177763caa51ff2b9c7054b07"
    
    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=38128371177763caa51ff2b9c7054b07`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (json) {
            console.log(json)
            var list = json.list
            var abc = json.city.name
            populateCards(list)
            populateCityInfo(json)
        })
}

function populateCityInfo(cityName) {
    
    var cityTitle = cityName.city.name
    var temperature = cityName.list[0].main.temp
    var windSpeed = cityName.list[0].wind.speed
    console.log(temperature)
    var cityContainer = document.getElementById("city-info-container")
    cityContainer.innerHTML = [cityTitle,"Temp " + temperature, "Windspeed " +windSpeed]

   


}

function populateCards(cardData) {
    var fiveDayWeather = []
    for (var x = 0; x < cardData.length; x++) {
        var item = cardData[x]
        var dateString = item.dt_txt
        if (dateString.includes("12:00")) {
            fiveDayWeather.push(item)
        }
    }
    var cardsContainer = document.getElementById("cards-container")
    cardsContainer.innerHTML = ""
    for (var x = 0; x < fiveDayWeather.length; x++) {
        var weatherObj = fiveDayWeather[x]
        var card = generateCard(weatherObj)
        cardsContainer.innerHTML += card
    }
}

function generateCard(weatherObj) {
    
    var k = weatherObj.main.temp
    var humidity = weatherObj.main.humidity
    var iconHtml = weatherObj.weather[0].main.icon
    var dateCard = weatherObj.dt_txt
 

    var card = ` <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${dateCard}</h5>
      <h6 class="card-subtitle mb-2 text-muted"> ${iconHtml}</h6>
      <p class="card-text">Temp: ${kToF(k)}</p>
      <p class="card-text">Humidity: ${humidity}</p>
    </div>
</div>`
    return card
}

function kToF(k) {
    return (k - 273) * 9 / 5 + 32
}

