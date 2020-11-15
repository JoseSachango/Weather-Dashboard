
//the variable that holds the list of cities
var cityList = ``

//function that grabs the data loads the data onto the page
function loadData(){

    //openWeather api key
    var apiKeyCurrentWeather = "833eb16104bf93498588f46b928111ab"
    var apiKeyForecast = "ab3a133ff08545c18c41d6d6bc01f775"
                 


    //grabbing city from
    var city = $("#inputfield").val()
    console.log(city)



    //URL to query to current weather data
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyCurrentWeather}&units=imperial`

    //URL to query to 5 day forecast data
    var queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKeyForecast}`


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response)

        var humidity = response.main.humidity
        var temperature = response.main.temp
        var windSpeed = response.wind.speed
        var cityName = response.name
        var dateTime = (response.dt)*1000
        var newDate = new Date(dateTime).toLocaleDateString()
        var newTime = new Date(dateTime).toLocaleTimeString()
        
        

        

        var htmlCityList = `

                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    ${cityName}
                </li>

        
        
        
        `


        cityList = cityList+ " " +htmlCityList
        

        var htmlData = `

                <div class="card mt-3 p-3">

                    <div class="card-body">

                        <div class="d-block mb-3">
                                <h4 class="card-title text-dark d-inline">${cityName}</h4>
                                <h4 class="card-title text-dark d-inline">(${newDate})</h4>
                        </div>
                       
                        
                        
                        <p class="card-text">Temperature: ${temperature} F</p>
                        <p class="card-text">Humidity: ${humidity} %</p>
                        <p class="card-text">Wind Speed: ${temperature} MPH</p>
                       
                    </div>

                </div>

                <h5 class="d-block mt-5 text-dark p-3">5-Day Forecast:</h5>

                

        `

        localStorage.setItem("htmlData",htmlData)

        $("#citylist").html(cityList)
        $("#secondcolumn").html(htmlData)


    })




    


    //Querying 5 day forecast data using a different api
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response2){


        console.log("Second response "+response2)

       

    })



}


$("#searchbutton").on("click",loadData)

$(document).ready(function(){

    var $htmlData = localStorage.getItem("htmlData")

    $("#secondcolumn").html($htmlData)

})

