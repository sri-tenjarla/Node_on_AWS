import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as util from 'util';
import { Today } from './today';

const date = new Today();

const app = express();
const port = 3000;


const filePath = path.join(__dirname, '../package.json');
const str = 'The item at %d position is %s.';
fs.readFile(filePath, 'utf8', (err: unknown, data: string) => {
    if (err) {
        console.error(err, __dirname);
        return;
    }
    const jsonData: JSON = JSON.parse(data);
    const keys: string[] = Object.keys(jsonData);
    console.table({ OS: os.platform(), Architecture: os.arch(), Project: JSON.parse(data).description });
    for (let i = 1; i <= Object.keys(jsonData).length; i++) {
        console.log(util.format(str, i, keys[i - 1]));
    }
})


app.get('/', (req: Request, res: Response) => {
    console.info(`GET / – Todays date is ${date.getDate()}`);
    res.send(`Hello from Tenjarlas! Todays date is ${date.getDate()}`);
});

app.get('/freya', (req: Request, res: Response) => {
    console.info('get /freya');
    res.send('Hello from Freya!');
});

app.get('/sri', (req: Request, res: Response) => {
    console.info('get /sri');
    res.json({ name: "Hello from Sri!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
