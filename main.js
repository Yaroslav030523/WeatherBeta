let inp = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let container = document.querySelector(".cont");
let containerTyDay = document.querySelector(".containerTyDay");
let earth = document.querySelector(".earth");
let more = document.querySelector(".more");
let newSerch = document.querySelector(".newSerch");
let contImg = document.querySelector(".contImg");

newSerch.addEventListener("click", reloadConfirm);

btn.addEventListener("click", test);

function reloadConfirm() {
  {
    window.location.reload();
  }
}

inp.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    test();
  }
});
function test() {
  let city = inp.value;
  let APIKey = "9374d63e740a2c64651f34d8ba3545de";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        earth.src = "./weather_png/Erorr.png";
        inp.value = "";
        return;
      }
      console.log(json.list);
      creatDiv(json.list);
    });
}

let mas = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function creatDiv(elem) {
  for (let i = 0; i < elem.length; i++) {
    if (
      elem[i].dt_txt.split(" ")[0] !==
      new Date().toISOString().slice(0, 10).split("-").join("-")
    ) {
      let div = document.createElement("div");
      div.className = "wetherTime";
      div.innerHTML =
        "day: " +
        elem[i].dt_txt.split(" ")[0].split("-")[2] +
        " / " +
        elem[i].dt_txt.split(" ")[1];
      container.append(div);

      let tyDayTemperatur = document.createElement("p");
      tyDayTemperatur.className = "wetherTemp";
      tyDayTemperatur.innerHTML = Math.round(elem[i].main.temp) + " °C";
      container.append(tyDayTemperatur);

      let imgSky = document.createElement("img");

      imgSky.src = `./weather_png/${elem[i].weather[0].main}.png`;
      imgSky.alt = elem[i].weather[0].main;
      imgSky.className = "imgSky";
      container.append(imgSky);
    } else {
      let divTyDay = document.createElement("div");
      divTyDay.className = "wetherTimeDay";
      divTyDay.innerHTML = elem[i].dt_txt.split(" ")[1];
      containerTyDay.append(divTyDay);
      let tyDayTemperatur = document.createElement("p");
      tyDayTemperatur.className = "wetherTemp";
      tyDayTemperatur.innerHTML = Math.round(elem[i].main.temp) + " °C";
      containerTyDay.append(tyDayTemperatur);

      let imgSky = document.createElement("img");

      imgSky.src = `./weather_png/${elem[i].weather[0].main}.png`;
      imgSky.alt = elem[i].weather[0].main;
      imgSky.className = "imgSkyDay";
      containerTyDay.append(imgSky);
    }

    earth.classList.add("none");
    container.classList.add("none");
    more.classList.remove("none");
    btn.classList.add("none");
    inp.classList.add("none");
    newSerch.classList.remove("none");
  }
}
more.addEventListener("click", function () {
  container.classList.toggle("none");
});
