
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
    //var queryURLForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKeyForecast}`


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response)

        var humidity = response.main.humidity
        var temperature = response.main.temp
        var windSpeed = response.wind.speed
        var cityName = response.name
        var currentWeather = response.weather[0].main
        var latitude = response.coord.lat
        var longitude = response.coord.lon
        var dateTime = (response.dt)*1000
        var newDate = new Date(dateTime).toLocaleDateString()
        var newTime = new Date(dateTime).toLocaleTimeString()

        if(currentWeather.includes("clouds")){
            var $img = `<img src="https://img.icons8.com/dusk/64/000000/cloud.png"/>`
        }else{

            var $img = `<img class="p-3" src="https://img.icons8.com/emoji/48/000000/sun-emoji.png"/>`

        }



        
        

        

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
                                <h4 class="card-title text-dark d-inline">${$img}</h4>


                        </div>
                       
                        
                        
                        <p class="card-text">Temperature: ${temperature} F</p>
                        <p class="card-text">Humidity: ${humidity} %</p>
                        <p class="card-text">Wind Speed: ${temperature} MPH</p>
                        <p class="card-text  d-inline">UV index: <span id="uvindex" class" col d-inline"></span></p>
                       
                    </div>

                </div>

                <h5 class="d-block mt-5 text-dark p-3">5-Day Forecast:</h5>

                <div id="forecastRow" class="row p-3">

                </div>

                

        `

        //localStorage.setItem("htmlData",htmlData)

        $("#citylist").html(cityList)
        $("#secondcolumn").html(htmlData)



        //calling second Api with latitude and longitude values returned from first Api call
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKeyForecast}`,
            method: "GET"
        }).then(function(response2){

            console.log(response2)

            var uvIndex = response2.current.uvi
            var uvIndexDiv = $("<div>")
            uvIndexDiv.attr("class","d-inline border rounded bg-danger text-white p-1")
            uvIndexDiv.attr("id","indexDiv")
            uvIndexDiv.text(uvIndex)

            $("#uvindex").append(uvIndexDiv)

            //var conditionForecast1 = response2.

            var foreCastCards = `

                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                        
                        <div class="card-body">
                            <h4 class="card-title">Primary card title</h4>
                            <img class="p-3" src="https://img.icons8.com/emoji/48/000000/sun-emoji.png"/>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                </div>
                
            
            `

            $("#forecastRow").append(foreCastCards)

            

            localStorage.setItem("htmlData",$("#secondcolumn").html())
        

        })



    })



}






$("#searchbutton").on("click",loadData)



//Load local storage data as soon as the page opens
$(document).ready(function(){

    var $htmlData = localStorage.getItem("htmlData")

    $("#secondcolumn").html($htmlData)

})

