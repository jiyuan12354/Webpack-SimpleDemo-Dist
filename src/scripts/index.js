
// if (module.hot) { 
//     module.hot.accept(
        
//     ); 
// }

//CommonJs style import
var greet = require('./greet.js');

//watch index.html changes
var html = require('../../index.html');

//Es6 module style import
import sum from './sum.js';

//Scss entry point
require('../scss/base.scss');

console.log('Index Loaded, the sum is', sum);
// console.log(html);

console.log(greet);



