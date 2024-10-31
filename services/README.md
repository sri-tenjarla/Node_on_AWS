Express.js API services:
7 most important Core modules in node.JS: 1. fs 2. os 3. path 4. http 5. util 6. url 7. querystring

# Example of using 'url' module

const url = require('url');
let webAddress = 'http://localhost:2000/index.html?lastName=Kent&firstName=Clark';
let qry = url.parse(webAddress, true);
let qrydata = qry.query; //returns an object: {lastName: 'Kent', firstName: 'Clark'}
console.log(qrydata.firstName); //outputs Clark

# Example of using 'querystring' module

let qry = require('querystring');
let qryParams = qry.parse('lastName=Kent&firstName=Clark');
console.log(qryParams.firstName); //returns Clark
