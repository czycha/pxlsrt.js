const Pxlsrt = require('../dist/pxlsrt.js');
const path = require('path');

const paths = {
  wall: path.join(__dirname, './wall.png'),
  court: path.join(__dirname, './court.jpg'),
  kat: path.join(__dirname, './kat.png'),
  output: function(number) {
    return path.join(__dirname, 'sort.' + number + '.png');
  },
};

// Load local image and sort with brute sorting filter
Pxlsrt.read(paths.wall).then(function(image) {
  console.log('Loaded ' + paths.wall);
  let output = paths.output(1);
  image.filter('brute', {
    min: 200, // Minimum band size of 200
    max: 200, // Maximum band size of 200
    method: 'hue', // Sort by hue
    direction: 'vertical', // Sort vertically.
    middlate: 1, // Radiate from middle of band
   }).write(output);
   console.log('Saved to ' + output);
});

// Load local image and sort with smart sorting filter
Pxlsrt.read(paths.kat).then(function(image) {
  console.log('Loaded ' + paths.kat);
  let output = paths.output(2);
  image.filter('smart', {
    threshold: 100, // Increase pixel collection threshold for grainy, complex photo
    method: 'none', // Don't actually sort
    reverse: true, // Reverse bands
  }).write(output);
  console.log('Saved to ' + output);
});

// Chain brute sort to sort across all directions
Pxlsrt.read(paths.court).then(function(image) {
  console.log('Loaded ' + paths.court);
  let output = paths.output(3);
  image.filter('brute', {direction: 'horizontal'}) // Sort horizontally
       .filter('brute', {direction: 'tlbr'}) // Sort top-left to bottom-right diagonal
       .filter('brute', {direction: 'vertical'}) // Sort vertically
       .filter('brute', {direction: 'trbl'}) // Sort top-right to bottom-left diagonal
       .filter('brute', {direction: 'horizontal'}) // Sort horizontally
       .write(output);
  console.log('Saved to ' + output);
});
