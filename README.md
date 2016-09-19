Promises for NodeJS

``` js
var Promise = require('./promise.js');

// Example usage of Promise.all()
// It will call each promise, and let you know as soon as there's an error,
// or when all the promises resolve.
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

// Example usage of Promise.race()
// It will call each promise, and return the result of only the first promise
// to resolve or reject.
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
