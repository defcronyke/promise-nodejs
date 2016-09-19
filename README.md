Promises for NodeJS

``` js
var Promise = require('./promise.js');

var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('2 second promise');
    }, 1000 * 2);
});

var p2 = Promise.resolve('instant promise');

Promise.all([p1, p2]).then((res) => {
    console.log('Promise.all res: ' + JSON.stringify(res));
}).catch((err) => {
    console.log('Promise.all err: ' + err);
});

p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('2 second promise');
    }, 1000 * 2);
});

p2 = Promise.resolve('instant promise');

Promise.race([p1, p2]).then((res) => {
    console.log('Promise.race res: ' + res);
}).catch((err) => {
    console.log('Promise.race err: ' + err);
});
```
