import styles from './Search.module.css'
import { useState } from 'react'

export default function Search(){

    const [ city, setCity ] = useState('São Paulo')
    const [weatherForecast, setWeatherForecast ] = useState(null)

    const handleChange = ((e) => {
        setCity(e.target.value)
    })

    const handleSearch = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=35a27291350e4dc19cb134451230505&q=${city}&lang=pt`)
        .then(res => res.json())
        .then((data) => {
            setWeatherForecast(data)
            console.log(weatherForecast)
        })
        .catch(err => console.error(err))
    }

    return(
        <>

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
                            value={city} 
                            placeholder='Ex: São Paulo'
                        />
                    </form>

                    <button onClick={handleSearch}>
                        Pesquisar
                    </button>
                </div>
            </div>
        ) : null

        }
        </>
    )
}