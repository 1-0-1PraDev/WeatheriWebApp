const apiKey = "ce25d709cdc9464b99f10551221105";

const cloudsP = document.querySelector(".clouds-value");
const humidityP = document.querySelector(".humidity-value");
const windSpeedP = document.querySelector(".windSpeed-value");
const isDayP = document.querySelector(".isDay-value");
const tempC = document.querySelector(".tempInCel");
const cityName = document.querySelector(".city-name");
const timeSpan = document.querySelector(".time");
const dayNameSpan = document.querySelector(".day-name");
const monthDtSpan = document.querySelector(".month-date");
const tempCel = document.querySelector(".tempInCel");
const searchBtn = document.querySelector(".searchBtn");
const inputField = document.querySelector(".input-field");
const iconImg = document.querySelector("#iconImg");



window.addEventListener("load", function(){
    
    let long, lat;
    if(this.navigator.geolocation){
        this.navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;
            fetch(baseUrl).then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                const { current, location } = data;
                const { condition : {text, icon}, cloud, humidity, is_day, temp_c, uv, wind_kph } = current;
                const iconUrl = `https:${icon}`;
                const { country, localtime, name, region } = location;

                cloudsP.textContent = `${cloud}%`;
                humidityP.textContent = `${humidity}%`;
                windSpeedP.textContent = `${wind_kph} kph`;
                let dayNight = is_day == 1 ? "Day" : "Night";
                isDayP.textContent = `${dayNight}`;
                cityName.textContent = `${name}, ${region}`;

                const localtimeArr = localtime.split(" ");
                const dateArr = localtimeArr[0].split("-");
                const year = dateArr[0];
                const month = dateArr[1];
                const date = dateArr[2];
                const time = localtimeArr[1];

                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                let d = new Date(localtimeArr[0]);
                let dayName = days[d.getDay()];
                let monthName = months[d.getMonth()];
                
                tempC.innerHTML = `${temp_c} <sup>o</sup> C`;
                iconImg.src = iconUrl;
                timeSpan.textContent = `${time}`;
                dayNameSpan.textContent = `${dayName},`;
                monthDtSpan.textContent = `${monthName} ${year}`;

            })
        });
    }
});

searchBtn.addEventListener("click", function(e){
    // let inputField = e.target.previousElementSibling;
    console.log(inputField.value);
    let cityNam = inputField.value;
    inputField.value = "";
    // console.log(inputField.childNodes[1].value);
    const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityNam}`;
    fetch(baseUrl).then(function(response){
        return response.json();
    }).then(function(data){
        const { current, location } = data;
        const { condition : {text, icon}, cloud, humidity, is_day, temp_c, uv, wind_kph } = current;
        const iconUrl = `https:${icon}`;
        const { country, localtime, name, region } = location;

        cloudsP.textContent = `${cloud}%`;
        humidityP.textContent = `${humidity}%`;
        windSpeedP.textContent = `${wind_kph} kph`;
        let dayNight = is_day == 1 ? "Day" : "Night";
        isDayP.textContent = `${dayNight}`;
        cityName.textContent = `${cityNam}, ${region}`;

        const localtimeArr = localtime.split(" ");
        const dateArr = localtimeArr[0].split("-");
        const year = dateArr[0];
        const month = dateArr[1];
        const date = dateArr[2];
        const time = localtimeArr[1];

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            let d = new Date(localtimeArr[0]);
            let dayName = days[d.getDay()];
            let monthName = months[d.getMonth()];
            
            tempC.innerHTML = `${temp_c} <sup>o</sup> C`;
            iconImg.src = iconUrl;
            timeSpan.textContent = `${time}`;
            dayNameSpan.textContent = `${dayName},`;
            monthDtSpan.textContent = `${monthName} ${year}`;
    })
});
