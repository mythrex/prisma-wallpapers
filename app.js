const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

request('https://www.instagram.com/prisma/?hl=en',function (err, response, html) {
  var $ = cheerio.load(html)

  
})
