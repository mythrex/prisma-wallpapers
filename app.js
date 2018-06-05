const fs = require('fs');
var casper = require('casper').create();
var request = require('request')

var aLinks, imgLink;
var randomInt = 0;
var IMAGE_URL = 'https://www.instagram.com/prisma/'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getALinks(){
  var links = document.querySelectorAll('.v9tJq article div div .Nnq7C .v1Nh3 a')
  return Array.prototype.map.call(links, function (elem) {
    return elem.getAttribute('href')
  })
}

function getImgLink(){
  var img = document.querySelectorAll('.zZYga .PdwC2 article .FFVAD');
  return (Array.prototype.map.call(img, function (elem) {
    return elem.getAttribute('src')
  }))[0]
}

casper.start('https://www.instagram.com/prisma/?hl=en');

casper.then(function () {
  aLinks = this.evaluate(getALinks)
  this.echo(typeof(aLinks[]));
  //assign a random No from 0 - aLinks.length
  randomInt = getRandomInt(aLinks.length)
  this.echo('Downloading to '+(randomInt + 1) + ' image')
  // IMAGE_URL = IMAGE_URL + '/' +
})

// casper.thenOpen(IMAGE_URL+aLinks[randomInt], function () {
//   this.echo('Seaching the Wallpaper...')
//   imgLink = this.evaluate(getImgLink)
//   this.echo('Image Link' + imgLink)
//   this.echo('Downloading Wallpaper Please wait..')
//   request(imgLink).pipe(fs.createWriteStream('Wallpaper.jpg'))
// })

casper.run();
