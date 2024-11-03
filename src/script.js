const searchbox = document.getElementById("search-box");
const searchbtn = document.getElementById("search-btn");
const ucl_btn = document.getElementById("ucl-btn");
const fivedaycontainer = document.getElementById("boxes");
const suggestions = document.getElementById("suggestions");

let newdate = new Date();

const api_key = "06d0de9c50353a89229de9774f7f1a8a";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";



///////////////////////////////////// Default City Weather Forecast /////////////////////////////////////

async function defaultwether() {
   
const default_key = "06d0de9c50353a89229de9774f7f1a8a";
const default_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi";

const fetchdefault = await fetch(default_url+ `&appid=${default_key}`);
   
const defaultdata = await fetchdefault.json();

   document.getElementById("city").innerHTML=`${defaultdata.name} (${newdate.getFullYear()}-${newdate.getMonth()}-${newdate.getDate()})`;
   document.getElementById("temp").innerHTML="Temp: " + Math.round(defaultdata.main.temp) +"°C" ;
   document.getElementById("wind").innerHTML="Wind: "+defaultdata.wind.speed +" km/h";
   document.getElementById("humidity").innerHTML="Humidity: "+defaultdata.main.humidity +"%";
   document.getElementById("weather").innerHTML ="Weather: "+defaultdata.weather[0].main;

   const defaulticon = document.getElementById("img");

   if(defaultdata.weather[0].main == "Clouds"){
      icon.src ="clouds.png";

   }
   else if (defaultdata.weather[0].main == "Clear"){
      defaulticon.src ="clear.png";
    } 
    else if (defaultdata.weather[0].main == "Rain"){
      defaulticon.src ="rain.png";

    } 
    else if (defaultdata.weather[0].main == "Snow"){
      defaulticon.src ="snow.png";
    } 
    else if (defaultdata.weather[0].main == "Wind"){
      defaulticon.src ="wind.png";
    }    
    else if (defaultdata.weather[0].main == "Drizzle"){
      defaulticon.src ="drizzle.png";
    }
    else if (defaultdata.weather[0].main == "Smoke"){
      defaulticon.src ="smoke.png";
    }
    else if (defaultdata.weather[0].main == "Haze"){
      defaulticon.src ="haze.png";
    }  
    else if (defaultdata.weather[0].main == "Humidity"){
      defaulticon.src ="wind.png";
    } 
    defaultfivedayweather();

}
////////// Five-Day Weather Forecast for default city /////////////
async function defaultfivedayweather() {
const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=d5521dbddbeeca264851d627f1a2c9e9&units=metric`);
const defaultcity = await response.json();
 
   fivedaycontainer.innerHTML = '';
    const dailyData = {};
    defaultcity.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(item);
    });

    for (const date in dailyData) {
      const dayData = dailyData[date];
      const Temp =  Math.round(dayData[0].main.temp);
      const wind = dayData[0].wind.speed;
      const humidity =dayData[0].main.humidity;
      const weather = dayData[0].weather[0].main;
   
      const dayElement = document.createElement('div');
        dayElement.className = 'fivedayforecast';
        dayElement.innerHTML = `
            <strong>${date}</strong>
            <p>Temp: ${Temp}°C</p>
            <p>Wind: ${wind} M/h </p>
            <p>Humidity: ${humidity} %</p>
            <p>Weather: ${weather}</p>
            
        `;
        fivedaycontainer.appendChild(dayElement);
}
                    
}  
window.onload = defaultwether;


///////////////////////////////////// Weather Forecast for Searched City /////////////////////////////////////

searchbtn.addEventListener("click" ,()=>{
   if(searchbox.value == ''){
      alert("Please enter a city name");
   }
   else{
      try{
         searchweather(searchbox.value);
         fivedayweather(searchbox.value);
      }
      catch{
     alert("Error")
      }
   
   }
});


const loadSuggestions = () => {
   const items = JSON.parse(localStorage.getItem('searchItems')) || [];
   return items;
};


searchbox.addEventListener('focus', () => {
   const items = loadSuggestions();
   if (items.length > 0) {
       suggestions.innerHTML = '';
       items.forEach(item => {
           const div = document.createElement('div');
           div.textContent = item;
           div.onclick = () => {
               searchbox.value = item;
               suggestions.style.display = 'none';
           };
           suggestions.appendChild(div);
       });
       suggestions.style.display = 'block';
   }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (event) => {
   if (!searchbox.contains(event.target) && !suggestions.contains(event.target)) {
       suggestions.style.display = 'none';
   }
});


// Handle search button click
searchbtn.addEventListener('click', () => {
const query = searchbox.value.trim();
if (query) {
    // Save to local storage
    const items = loadSuggestions();
    if (!items.includes(query)) {
        items.push(query);
        localStorage.setItem('searchItems', JSON.stringify(items));
    }
    searchbox.value = '';
    suggestions.style.display = 'none';
}
});

// Clear input when hitting 'Enter' and save the search
searchbox.addEventListener('keypress', (event) => {
if (event.key === 'Enter') {
    searchbtn.click();
}
});



async function searchweather(city) {

    const fetchdata = await fetch(api_url + city +`&appid=${api_key}`);
   
    const data = await fetchdata.json();

    document.getElementById("city").innerHTML=`${data.name} (${newdate.getFullYear()}-${newdate.getMonth()}-${newdate.getDate()})`;
    document.getElementById("temp").innerHTML="Temp: " + Math.round(data.main.temp) +"°C" ;
    document.getElementById("wind").innerHTML="Wind: "+data.wind.speed +" km/h";
    document.getElementById("humidity").innerHTML="Humidity: "+data.main.humidity +"%";
    document.getElementById("weather").innerHTML ="Weather: "+data.weather[0].main;
    
    const icon = document.getElementById("img");

    if(data.weather[0].main == "Clouds"){
       icon.src ="clouds.png";
 
    }
    else if (data.weather[0].main == "Clear"){
        icon.src ="clear.png";
     } 
     else if (data.weather[0].main == "Rain"){
        icon.src ="rain.png";
     } 
     else if (data.weather[0].main == "Snow"){
        icon.src ="snow.png";
     } 
     else if (data.weather[0].main == "Wind"){
        icon.src ="wind.png";
     }    
     else if (data.weather[0].main == "Drizzle"){
        icon.src ="drizzle.png";
     }
     else if (data.weather[0].main == "Smoke"){
      icon.src ="smoke.png";
    }
     else if (data.weather[0].main == "Haze"){
        icon.src ="haze.png";
     }  
     else if (data.weather[0].main == "Humidity"){
        icon.src ="wind.png";
     } 
   }

   /////////// Five-Day Weather Forecast for searched city ///////////// 
   async function fivedayweather(city) {
     const response =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d5521dbddbeeca264851d627f1a2c9e9&units=metric`)   
       const newdata = await response.json();
       displayForecast(newdata);
   }




      function displayForecast(newdata) {
      
         fivedaycontainer.innerHTML = '';
          const dailyData = {};
      
          newdata.list.forEach(item => {
              const date = item.dt_txt.split(' ')[0];
              if (!dailyData[date]) {
                  dailyData[date] = [];
              }
              dailyData[date].push(item);
          });
      
          for (const date in dailyData) {
            const dayData = dailyData[date];
            const Temp =  Math.round(dayData[0].main.temp);
            const wind = dayData[0].wind.speed;
            const humidity =dayData[0].main.humidity;
            const weather = dayData[0].weather[0].main;
         
            const dayElement = document.createElement('div');
              dayElement.className = 'fivedayforecast';
              dayElement.innerHTML = `
                  <strong>${date}</strong>
                  <p>Temp: ${Temp}°C</p>
                  <p>Wind: ${wind} M/h </p>
                  <p>Humidity: ${humidity} %</p>
                  <p>Weather: ${weather}</p>
                  
              `;
              fivedaycontainer.appendChild(dayElement);
      }
   }          
       
      //Click event on search button



///////////////////////////////////// User Current location Weather Forecast /////////////////////////////////////


// Accessing user current location
ucl_btn.addEventListener("click",getLocation);
async function getLocation() {
   navigator.geolocation.getCurrentPosition(position => {
      const {latitude,longitude} = position.coords;  
      getWeatherDataByCoords(latitude,longitude);
        },
   error => {
      alert("Unable to get location !");
   }
);
}

function getWeatherDataByCoords(latitude, longitude) {
   try{
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d5521dbddbeeca264851d627f1a2c9e9&units=metric`;
   fetch(url)
       .then(response => response.json())
       .then(data => {
           getData(latitude,longitude);
           getFiveDayForecast(latitude, longitude);
       })
       .catch(error => alert('Error fetching weather data!'));
   }
   catch{
      alert("Something went wrong");
   }
}


// Fetching weather data
async function getData(latitude,longitude){
   const ucl =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`);
   
   const ucldata = await ucl.json() ;
   document.getElementById("city").innerHTML=`${ucldata.name} (${newdate.getFullYear()}-${newdate.getMonth()}-${newdate.getDate()})`;
   document.getElementById("temp").innerHTML="Temp: " + Math.round(ucldata.main.temp) +"°C" ;
   document.getElementById("wind").innerHTML="Wind: "+ucldata.wind.speed +" km/h";
   document.getElementById("humidity").innerHTML="Humidity: "+ucldata.main.humidity +"%";
   document.getElementById("weather").innerHTML ="Weather: "+ucldata.weather[0].main;
   
   const icon = document.getElementById("img");

   if(ucldata.weather[0].main == "Clouds"){
      icon.src ="clouds.png";

   }
   else if (ucldata.weather[0].main == "Clear"){
       icon.src ="clear.png";
    } 
    else if (ucldata.weather[0].main == "Rain"){
       icon.src ="rain.png";

    } 
    else if (ucldata.weather[0].main == "Snow"){
       icon.src ="snow.png";
    } 
    else if (ucldata.weather[0].main == "Wind"){
       icon.src ="wind.png";
    }    
    else if (ucldata.weather[0].main == "Drizzle"){
       icon.src ="drizzle.png";
    }
    else if (ucldata.weather[0].main == "Smoke"){
      icon.src ="smoke.png";
   } 
    else if (ucldata.weather[0].main == "Haze"){
       icon.src ="haze.png";
    }  
    else if (ucldata.weather[0].main == "Humidity"){
       icon.src ="wind.png";
    }

}

async function uclfivedayweather(latitude,longitude) {
   
   const geocoding_data = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=d5521dbddbeeca264851d627f1a2c9e9`);
   const geodata = await geocoding_data.json();

console.log(geodata);
  
}
           
function getFiveDayForecast(lat, lon) {
   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d5521dbddbeeca264851d627f1a2c9e9&units=metric`;
   fetch(url)
       .then(response => response.json())
       .then(data => {

         fivedaycontainer.innerHTML = '';
       const dailyData = {};

         data.list.forEach(item => {
                       const date = item.dt_txt.split(' ')[0];
                       if (!dailyData[date]) {
                           dailyData[date] = [];
                       }
                       dailyData[date].push(item);
                   });
               
                   for (const date in dailyData) {
                     const dayData = dailyData[date];
                     const Temp =  Math.round(dayData[0].main.temp);
                     const wind = dayData[0].wind.speed;
                     const humidity =dayData[0].main.humidity;
                     const weather = dayData[0].weather[0].main;
                  
                     const dayElement = document.createElement('div');
                       dayElement.className = 'fivedayforecast';
                       dayElement.innerHTML = `
                           <strong>${date}</strong>
                           <p>Temp: ${Temp}°C</p>
                           <p>Wind: ${wind} M/h </p>
                           <p>Humidity: ${humidity} %</p>
                           <p>Weather: ${weather}</p>
                           
                       `;
                       fivedaycontainer.appendChild(dayElement);
       }
      })
   }
      

       



