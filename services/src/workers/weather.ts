import { parentPort } from 'worker_threads';
import axios from 'axios';

const url = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true";

async function getWeatherData() {
    console.log('Fetching weather data...');
    const response = await axios.get(url);
    console.log(`${response.status}`);
    return response.data;
}

getWeatherData()
    .then((data) => {
        // console.log(data);
        parentPort?.postMessage(data)
    })
    .catch((error) => {
        console.error(error);
        parentPort?.postMessage({ error })
    });