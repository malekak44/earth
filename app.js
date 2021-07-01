const url = "https://restcountries.eu/rest/v2/all";
fetch(url)
    .then(res => res.json())
    .then(data => displayCountries(data))
    .catch(error => console.log(error));

function displayCountries(data) {
    let countries = data.map(country => country);
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        let countriesDiv = document.getElementById("countries");
        let countryDiv = document.createElement("div");
        let countryHTML = `<div class="card" style="width: 18rem;">
                            <img style="height: 190px !important;" src="${country.flag}" class="card-img-top" alt="${country.name}">
                            <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                            <p class="card-text">Capital: ${country.capital}</p>
                            <p class="card-text">Code: ${country.alpha2Code}</p>
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#myModal" id="${i}" onclick="displayModal(this.id)">See More</button>
                            </div>
                        `;
        countryDiv.innerHTML = countryHTML;
        countriesDiv.appendChild(countryDiv);
    }
}

function displayModal(id) {
    fetch(url)
        .then(res => res.json())
        .then(data => setModal(data))
        .catch(error => console.log(error));

    function setModal(data) {
        let countries = data.map(country => country);
        for (let i = 0; i < countries.length; i++) {
            let title = document.getElementById("myModalLabel");
            title.innerText = `${countries[id].name}`;
            let content = document.getElementById("content");
            content.innerHTML = `<img src="${countries[id].flag}" alt="${countries[id].name}">
            <ul>
            <li class="card-text">Capital: ${countries[id].capital}</li>
            <li class="card-text">Code: ${countries[id].alpha2Code}</li>
            <li class="card-text">Area: ${countries[id].area}sqkm</li>
            <li class="card-text">Currency: ${countries[id].currencies[0].name}</li>
            <li class="card-text">Population: ${countries[id].population}</li>
            <li class="card-text">Language: ${countries[id].languages[0].name}</li>
            <ul>`;
        }
    }
}
