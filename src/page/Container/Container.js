import styles from './Container.module.css'
import Search from '../../components/search/Search'
import Weather from '../../components/weather/Weather'

export default function Container(){
    return(
        <main className={styles.container}>
            
                <Search/>
            

            
                <Weather/>
           

        </main>
    )
}
