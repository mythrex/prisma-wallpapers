const fs = require('fs');
var casper = require('casper').create();
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
  var img = document.querySelectorAll('article.QBXjJ .eLAPa .KL4Bh .FFVAD');
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
})

casper.thenOpen(IMAGE_URL, function () {
  this.echo('Opening Url: '+IMAGE_URL)
  this.echo('Seaching the Wallpaper...')
  // imgLink = this.evaluate(getImgLink)
  this.echo(imgLink)
  if(imgLink){
    this.echo('Downloading Wallpaper Please wait..')
    this.download(imgLink,'wallpaper.jpg');
  }
})


casper.run();
