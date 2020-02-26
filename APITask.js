class Weather {
    inputEl = document.querySelector('.search');

    constructor() {
        this.inputEl.focus();
        this.search();
        this.inputEl.value = 'Tehran';
        this.inputEl.addEventListener('keypress', event => {
            if (event.keyCode === 13)
                this.search();
            return;
        })
    }

    search() {

        this.searchValue = this.inputEl.value;
        this.inputEl.value = '';
        this.inputEl.focus();
        this.fetchData();
    }

    fetchData() {
        const city = this.searchValue;
        const apiID = '0f6df01c3678777f5c42a1e99033bd85';
        const units = 'metric';
        const url = 'https://api.openweathermap.org/data/2.5/weather';

        axios.get(url, {
            params: {
                q: city,
                appid: apiID,
                units
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.data = response.data;
                    this.render();
                }
            });
    }

    render() {
        let weatherHtml = '';
        const scatterClouds = 'images/scatterClouds.png';
        const fewClouds = 'images/fewClouds.png';
        const clouds = 'images/clouds.png';
        const rain = 'images/rain.png';
        const clear = 'images/clear.png';
        const snow = 'images/snow.png';
        const fog = 'images/fog.png';
        const drizzle = 'images/drizzle.png'
        let imgUrl;


        this.data.weather.forEach(weather => {
            switch (weather.main) {
                case 'Scatter Clouds':
                    imgUrl = scatterClouds;
                    break
                case 'Few Clouds':
                    imgUrl = fewClouds;
                    break
                case 'Clouds':
                    imgUrl = clouds;
                    break
                case 'Rain':
                    imgUrl = rain;
                    break
                case 'Clear':
                    imgUrl = clear;
                    break
                case 'Snow':
                    imgUrl = snow;
                    break
                case 'Fog':
                    imgUrl = fog;
                    break
                case 'Mist':
                    imgUrl = fog;
                    break
                case 'Drizzle':
                    imgUrl = drizzle;
                    break
                case 'Haze':
                    imgUrl = fog;
            }
            weatherHtml += `
                    <li>
                        <table>
                            <tr>
                                <td>${weather.main}</td>
                                <td><img src="${imgUrl}"></td>
                            </tr>
                        </table>
                    </li>
                `;
        });
        const html = `
            <div class="card text-center">
                <div class="card-header">
                    Current Weather
                </div>
                <div class="card-body">
                    <h3 class="card-title">${this.data.name}</h3>
                    <ul>
                        ${weatherHtml}
                    </ul>
                    <div>
                        <span>Temp:   </span>
                        <span>${this.data.main.temp}</span>
                    </div>
                    <div>
                        <span>Feels Like:   </span>
                        <span>${this.data.main.feels_like}</span>
                    </div>
                </div>
                
                <div class="card-footer text-muted">
                    Open Weather
                </div>
            </div>
        `;

        document.getElementById('weather').innerHTML = html;
    }
}

const weather = new Weather();