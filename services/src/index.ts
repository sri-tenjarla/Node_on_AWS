import express, { Request, Response } from 'express';
import { Worker } from 'worker_threads';
import * as path from 'path';

const app = express();
const port = 3000;

function runWorker(file: string) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(file, {
            execArgv: ['-r', 'ts-node/register']
        });
        worker.on('message', resolve);
        worker.on('error', (error) => {
            reject(error);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`stopped with exit code ${code}`));
            }
        });
    });
}

app.get('/aggregate', async (req: Request, res: Response) => {
    try {
        const weatherDataProm = runWorker(path.resolve(__dirname, './workers/weather.ts'));
        const sportsDataProm = runWorker(path.resolve(__dirname, './workers/sports.ts'));
        const stocksDataProm = runWorker(path.resolve(__dirname, './workers/stocks.ts'));

        const [weatherData, sportsData, stocksData] = await Promise.all([
            weatherDataProm, sportsDataProm, stocksDataProm
        ]);
        res.json({ weatherData, sportsData, stocksData });
    } catch (error) {
        console.error('Error during /aggregate call:', error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});