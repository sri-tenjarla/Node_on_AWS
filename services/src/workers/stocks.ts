import { parentPort } from "worker_threads";
import axios from 'axios';

const url = 'https://api.exchangerate-api.com/v4/latest/USD';

async function getStocksData() {
    console.log('Fetching stocks data...');
    const response = await axios.get(url);
    return response.data;
}

getStocksData()
    .then((data) => {
        // console.log(data);
        parentPort?.postMessage(data)
    })
    .catch((error) => {
        console.error(error);
        parentPort?.postMessage({ error })
    });