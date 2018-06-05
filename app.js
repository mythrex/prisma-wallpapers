const fs = require('fs');
var casper = require('casper').create();
var request = require('request')

var aLinks;

const URL = 'https://www.instagram.com'
function getALinks(){
  var links = document.querySelectorAll('.v9tJq article div > div > .Nnq7C .v1Nh3 a')
  return Array.prototype.map.call(links, function (elem) {
    return elem.getAttribute('href')
  })
}

// function getImgLinks(){
//     var links = document.querySelectorAll('.v9tJq article div > div > .Nnq7C img')
//     return Array.prototype.map.call(links, function (elem) {
//       return elem.getAttribute('src')
//     })
// }

casper.start(`${URL}/prisma/?hl=en`);

casper.then(function () {
  aLinks = this.evaluate(getALinks);
  this.echo(aLinks)
})

// casper.then(function() {
//     imgLinks = this.evaluate(getImgLinks)
//     this.echo(imgLinks)
// });

casper.run();
