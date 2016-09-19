var Promise = require('./promise.js');

var p = new Promise((resolve, reject) => {
    resolve('bud');
    // reject('butt');
});

p.then((res) => {
    console.log('res1: ' + res);
}).catch((err) => {
    console.log('err1: ' + err);
});

Promise.all([
    new Promise((resolve, reject) => {
        resolve('duck');
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('pant');
        }, 1000 * 5);

        // reject('bucket');
    }),
    // Promise.reject('no dogs!'),
    Promise.resolve('dogs')

]).then((res) => {
    console.log('Promise.all res: ' + JSON.stringify(res));
}).catch((err) => {
    console.log('Promise.all err: ' + JSON.stringify(err))
});

Promise.race([
    // Promise.reject('no dogs!'),
    new Promise((resolve, reject) => {
        resolve('duck');
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('pant');
        }, 1000 * 5);

        // reject('bucket');
    }),
    Promise.reject('no dogs!'),
    Promise.resolve('dogs')

]).then((res) => {
    console.log('Promise.race res: ' + JSON.stringify(res));
}).catch((err) => {
    console.log('Promise.race err: ' + JSON.stringify(err))
});
