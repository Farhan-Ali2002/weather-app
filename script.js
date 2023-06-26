const x = document.getElementById("demo");
let lat = null;
let long = null;



let timesOfDay = {"morning": "./images/morning.jpg","day": "./images/day.jpg","evening": "./images/evening.jpg","night": "./images/night.jpg","midnight": "./images/midnight.jpg",}

let dayWeathers = {"sunny":"./images/sun.png","rainy":"./images/raining.png","cloudy":"./images/cloudy.png","thunder":"./images/storm.png","fog":"./images/foggy.png","mist":"./images/fog.png",}
let nightWeathers = {"sunny":"./images/sun.png","rainy":"./images/raining.png","cloudy":"./images/cloudy.png","thunder":"./images/storm.png","fog":"./images/foggy.png","mist":"./images/fog.png",}
function getDay(inputDate){
  const date = new Date(inputDate);

// Get the day of the week as a number (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
const dayOfWeek = date.getDay();

// Create an array to map the day of the week number to its corresponding name
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// Get the name of the day using the array and the day of the week number
const dayName = daysOfWeek[dayOfWeek];

// Output the day of the week
return dayName
}


function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(getPosition);


    // colorBasedOnTime(1)
  } catch(err) {
    x.innerHTML = err;
  }
}

function getPosition(position) {
    lat =  position.coords.latitude;
    long = position.coords.longitude;
    console.log(position)
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

  getWeather()
}
// lat = 24.8887699
// long = 67.087941
// const apiKey = "appid=8e32ebcefff3cd849b225819dd71d47f"

const apiKey = "b20f6a2f4664441d8a62899de5077a1d"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`

async function getWeather() {
    
let day = ""

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=6260a7e08b98480788d124643230203&q=${lat},${long}&days=10&aqi=no&alerts=no`);


xhr.onload = function() {
  if (xhr.status === 200) {
   const data = JSON.parse(xhr.responseText);
    console.log(data);
    
    

    var currentImg = document.getElementById("weather-img")
    currentImg.src = `https:${data.current.condition.icon}`

    var isday = data.current.is_day;
    console.log("isday",isday)
   
    if (isday) {
      // currentImg.src = `./images/sun.png`
      changeTheme(isday)
      
    }
    else{
      // currentImg.src = `./images/moon.png`
      changeTheme(isday)
    }
    
    var forecastList = data.forecast.forecastday;
    var locationid = document.getElementById("location")
    locationid.innerHTML = data.location.name+", "+data.location.region+". "
    var tempid = document.getElementById("temp")
    tempid.innerHTML = data.current.temp_c+"°C"
    var weatherid = document.getElementById("weather")
    weatherid.innerHTML = data.current.condition.text
    

    
    var dateid = document.getElementById("date")
    let date = forecastList[0].date
    dateid.innerHTML = date

    var pdiv = document.createElement("div");
pdiv.style.listStyleType = "none"
pdiv.style.overflowY = "hidden"
pdiv.style.overflowX = "hidden"
pdiv.id = "parent-container"

    // Loop through the array

   
    for (var i = 0; i < (forecastList.length); i++) {
      var date1 = forecastList[i].date
      // var date2 = forecastList[i+1].dt_txt.split(" ")
      // var last2date1 = parseInt(date1[0].slice(-2))
      // var last2date2 = parseInt(date2[0].slice(-2))
      // console.log("1",last2date1)
      // console.log("2",last2date2)
      // // Create a new <cdiv> element
      // console.log(last2date1<last2date2)
      
      var cdiv = document.createElement("div");
    
      // Set the text content of the <cdiv> element
      cdiv.className = "cdiv"
    


    var weatherIcon = document.createElement("img")
    weatherIcon.src = `https:${forecastList[i].day.condition.icon}`
    // `${forecastList[i].day.condition.icon}`
    weatherIcon.id = "listIcon"
    cdiv.appendChild(weatherIcon)
    // var listdate = document.createElement("p")
    var listday = document.createElement("p")
//  listdate.className = "listdate"
    listday.className = "days"

    var minTempElement = document.createElement("p")
    var minTemp = forecastList[i].day.mintemp_c
    minTempElement.innerHTML = "min "+minTemp+"°C"
    var maxTempElement = document.createElement("p")
    var maxTemp = forecastList[i].day.maxtemp_c
    maxTempElement.innerHTML = "max "+maxTemp+"°C"
    minTempElement.id = "mintemp"
    maxTempElement.id = "maxtemp"

    // listdate.style.display="relative"
    // listdate.style.position = "50%"
    
   
    day = getDay(date1)
    console.log(date1)
    console.log(`${i} = ${day}`)
    listday.innerHTML = getDay(date1)
    // listdate.innerHTML = date1
    
    cdiv.appendChild(listday)
    // cdiv.appendChild(listdate)
    pdiv.appendChild(cdiv);
    cdiv.appendChild(minTempElement)
    cdiv.appendChild(maxTempElement)
    
      // Append the <cdiv> element to the <pdiv> element
      
    }
    
    
    // Append the <pdiv> element to the document body or any desired container
    document.getElementById("forecast-list").appendChild(pdiv);
    var time = data.current.last_updated
    time = time.split(" ")[1]
    // console.log("dummy",dummy)
    time= time.slice(0,2)
    time = parseInt(time)
    // console.log(dummy2)
    time = 18
    colorBasedOnTime(time)



  } else {
    console.error(`Error: ${xhr.status}`);
  }

};
xhr.onerror = function() {
  console.error('Request error');
};
xhr.send();


}

function changeTheme(isDay){
  // var cdiv = document.getElementsByClassName("cdiv")
  // var location = document.getElementById("location")
  // var temp = document.getElementById("temp")
  // var weather = document.getElementById("weather")
  // var date = document.getElementById("date")
  
  
  
  
  
  // for (let i = 0; i < cdiv.length; i++) {
  //   cdiv[i].style.border = "2px solid black"
    
  // }
  // location.style.color = "black"
  // temp.style.color = "black"
  // weather.style.color="black"
  // date.style.color="black"

  var mobile = document.getElementById("mobile")
  if (!isDay) {
    mobile.style.background = "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)"
    
  }
  else{
    mobile.style.background = "radial-gradient(circle at 10% 20%, rgb(129, 224, 230) 0%, rgb(103, 151, 219) 100.7%)"
  }

}

function colorBasedOnTime(time){
  var mobile = document.getElementById("mobile")
  
  
  // if (time >= 5 && time<= 12) {
    
  //   mobile.style.backgroundImage=`url(${timesOfDay.morning})`;
  //   changeTheme()
  //   console.log("morning")
  
    
  // }
  // else if (time>12 && time<=17) {
  //   console.log("day")
  //   mobile.style.backgroundImage=`url(${timesOfDay.day})`;
  //   changeTheme()
    
    
  // }

  // else if (time>17 && time<= 20) {
  //   console.log("evening")
  //   mobile.style.backgroundImage=`url(${timesOfDay.evening})`;
  //   changeTheme("evening")
    
  // }
  // else if (time>20 && time<=0) {
  //   console.log("night")
  //   mobile.style.backgroundImage=`url(${timesOfDay.night})`;
    
  // }
  // else if (time>0 && time<5) {
  //   console.log("midnight")
  //   mobile.style.backgroundImage=`url(${timesOfDay.midnight})`;
    
  // }


}
window.onload= getLocation()