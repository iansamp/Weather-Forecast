import styles from './Container.module.css'
import { useState } from 'react'
import { BiMap } from 'react-icons/bi'

export default function Container(){

    const [ city, setCity ] = useState('')
    const [weatherForecast, setWeatherForecast ] = useState(null)

    const handleChange = ((e) => {
        setCity(e.target.value)
    })

    const handleSearch = (e) => {
        e.preventDefault();

        if (city === "") {
            return;
        }

        Promise.all([
            fetch(`http://api.weatherapi.com/v1/current.json?key=35a27291350e4dc19cb134451230505&q=${city}&lang=pt`),
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=35a27291350e4dc19cb134451230505&q=${city}&lang=pt`)
        ])

        .then(responses => Promise.all(responses.map(response => response.json())))
        .then((data) => {
            const dataCurrent = data[0];
            const dataForecast = data[1];
            setWeatherForecast(dataCurrent, dataForecast)
            console.log(data)
        })
        .catch(err => console.error(err))

        setCity("");
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    };


    //const [ autoComplete, setAutoComplete ] = useState('')

    return(
        <main className={styles.container}>
            { !weatherForecast ? (

            <div className={styles.search}>
                <div>
                    <h1>
                        Verifique agora a previsão do tempo da sua cidade!
                    </h1>
                    <p>
                        Digite o nome da sua cidade ou a que desejar no campo abaixo e em seguida clique em pesquisar
                    </p>

                    <form>
                        <input
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={city} 
                            placeholder='Ex: São Paulo'
                        />
                    </form>

                    <button onClick={handleSearch}>
                        Pesquisar
                    </button>
                </div>
            </div>

            ) : null }

            { weatherForecast ? (
                <div className={styles.content}>
                    <div className={styles.form}>
                        <form>
                            <input
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                value={city} 
                                placeholder='Ex: São Paulo'
                            />
                        </form>

                        <button onClick={handleSearch}>
                            Pesquisar
                        </button>
                    </div>
                    <div className={styles.weather}>
                            <div className={styles.name}>
                                <p>
                                     <BiMap/> {weatherForecast.location.name}-{weatherForecast.location.region}
                                </p>
                            </div>

                            <div>
                                <img src={weatherForecast.current.condition.icon} />
                                <p className={styles.temp}>
                                    {weatherForecast.current.temp_c}<span>°C</span>
                                </p>
                                <p className={styles.temp}>
                                    {weatherForecast.current.temp_f}<span>°F</span>
                                </p>
                                <p className={styles.description}>
                                    {weatherForecast.current.condition.text} <br/>
                                    Vento: {weatherForecast.current.wind_kph} Km/h <br/>
                                    Humidade: {weatherForecast.current.humidity}% <br/>
                                </p>
                            </div>
                    </div>
                </div>
            ) : null }

        </main>
    )
}
