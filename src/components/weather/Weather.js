import styles from './Weather.module.css'

export default function Weather({ handleChange, handleSearch, city, weatherForecast}){
    return(
        <>
            { weatherForecast ? (
                <div className={styles.content}>
                    <div className={styles.form}>
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
                    <div>
                        <img src={weatherForecast.current.condition.icon} />
                    </div>
                </div>
            ) : null}
        </>

    )
}