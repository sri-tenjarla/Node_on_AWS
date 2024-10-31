import { parentPort } from 'worker_threads';
import axios from 'axios';

const url = 'https://api.cricapi.com/v1/series?apikey=c35dcdf2-ba31-44c8-9999-4132414e1f9e&offset=0';

async function getSportsData() {
    console.log('Fetching sports data...');
    const response = await axios.get(url);
    return response.data;
}

getSportsData()
    .then((data) => {
        // console.log(data);
        parentPort?.postMessage(data);
    })
    .catch((error) => {
        console.error(error);
        parentPort?.postMessage({ error });
    });