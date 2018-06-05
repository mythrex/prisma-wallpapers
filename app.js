const fs = require('fs');
var casper = require('casper').create({
  verbose: true,
  logLevel: "info",
  pageSettings: {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
  }
});
var http = require('http')

var aLinks, imgLink;
var randomInt = 0;
var IMAGE_URL = 'https://www.instagram.com'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getALinks(){
  var links = document.querySelectorAll('.v9tJq article div div .Nnq7C .v1Nh3 a')
  if(!links.length) getALinks();
  return Array.prototype.map.call(links, function (elem) {
    return elem.getAttribute('href')
  })
}

function getImgLink(){
  var img = document.querySelectorAll('.FFVAD');
  return img[0].getAttribute('src')
  // if(img.length){
  //   return Array.prototype.map.call(img, function (elem) {
  //     return elem.getAttribute('src')
  //   })
  // }
  // getImgLink();
}

casper.start('https://www.instagram.com/prisma/?hl=en');

casper.then(function () {
  aLinks = this.evaluate(getALinks)
  //assign a random No from 0 - aLinks.length
  randomInt = getRandomInt(aLinks.length)
  this.echo(randomInt)
  this.echo(aLinks)
  IMAGE_URL = IMAGE_URL+aLinks[randomInt]
  this.echo('Downloading to '+(randomInt + 1) + ' image')

  casper.thenOpen(IMAGE_URL, function () {
    this.echo('Opening Url: '+this.getCurrentUrl())
    this.echo('Seaching the Wallpaper...')
    imgLink = this.evaluate(getImgLink)
    if (this.exists('.FFVAD')) {
      this.echo('found #my_super_id', 'INFO');
    } else {
      this.echo('#my_super_id not found', 'ERROR');
    }
    this.echo(imgLink)
    if(imgLink){
      this.echo('Downloading Wallpaper Please wait..')
      this.download(imgLink,'wallpaper.jpg');
    }
  })

})



casper.run();
