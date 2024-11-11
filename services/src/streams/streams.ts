import fs from 'fs';
import * as rl from 'readline';

const inputFile = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

inputFile.question('Enter a file name: ', (fileName: string) => {
    console.log(fileName);
    const readableStream = fs.createReadStream(fileName, { encoding: 'utf8' });
    readableStream.on('data', (chunk) => {
        console.log('new chunk');
        console.log(chunk);
    });
    readableStream.on('end', () => {
        console.log('No more data.');
    });

    readableStream.on('error', (err) => {
        console.error('An error occurred:', err.message);
    });

});

// const readableStream = fs.createReadStream(path.join(__dirname, '../../../slides.pdf'), { encoding: 'utf8' });
