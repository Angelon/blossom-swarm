const Browser = require('zombie');


/*Browser
  .visit('http://chat-Publi-MYR76686FFYG-287595339.us-east-1.elb.amazonaws.com')
  .then(function () {
    console.log(Browser) // Jitsusama
  })*/

  Browser
  .visit('http://localhost:8000')
  .then(function () {
    console.log(Browser) // Jitsusama
  })