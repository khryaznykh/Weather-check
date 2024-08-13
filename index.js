const inputSearch = document.querySelector("#input");

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "78d198b14c9e2ac991a25d2b2d06f5da"
}

inputSearch.addEventListener("keydown", enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfoApi(inputSearch.value);
        inputSearch.value = "";
    }
}

myTime();

async function getInfoApi(info) {
    const resApi = await fetch(`${api.endpoint}weather?q=${info}&units=metric&appid=${api.key}`);
    const resApiJ = await resApi.json();
    console.log(resApiJ);
    getResults(resApiJ);
}

function getResults(resApiJ) {
    document.querySelector("#location").textContent=`${resApiJ.name}, ${resApiJ.sys.country}`;

    const temp = Math.round(resApiJ.main.temp);
    document.querySelector("#temperature").textContent = `${temp}°C`;

    const tempFeels = Math.round(resApiJ.main.feels_like);
    document.querySelector("#feelsLike").textContent = `Feels like: ${tempFeels}°C`;

    document.querySelector("#conditions").textContent = `${resApiJ.weather[0].main}`;

    const tempMin = Math.round(resApiJ.main.temp_min);
    const tempMax = Math.round(resApiJ.main.temp_max);
    document.querySelector("#range").textContent = `Min: ${tempMin}°C Max: ${tempMax}°C`;
}

function myTime() {
    const today = new Date;
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const year = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dayOfWeek = week[today.getDay()];
    dateOfMonth = today.getDate();
    month = year[today.getMonth()];
    yearNow = today.getFullYear();

    let todaysDate = document.querySelector("#date");

    todaysDate.textContent = `${dayOfWeek}, ${month} ${dateOfMonth}, ${yearNow}`
}
