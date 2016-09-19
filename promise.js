class Promise {
    constructor(f) {
        this.f = f;
    }

    resolve(res) {
        if (this.thenCallback) {
            this.thenCallback(res);
        }
    }

    reject(err) {
        if (this.catchCallback) {
            this.catchCallback(err);
        }
    }

    then(callback) {
        this.thenCallback = callback;
        process.nextTick(this.f.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
        return this;
    }

    catch(callback) {
        this.catchCallback = callback;
        return this;
    }
}

Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        var completed = [];
        for (var i = 0; i < promises.length; i++) {
            process.nextTick(((i) => {
                var promise = promises[i];
                promise.then((res) => {
                    completed.push(res);
                    if (completed.length >= promises.length) {
                        resolve(completed);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }).bind(this, i));
        }
    });
};

Promise.race = (promises) => {
    return new Promise((resolve, reject) => {
        var done = false;
        for (var i = 0; i < promises.length; i++) {
            process.nextTick(((i) => {
                var promise = promises[i];
                promise.then((res) => {
                    if (done) {
                        return;
                    }
                    resolve(res);
                    done = true;
                }).catch((err) => {
                    reject(err);
                });
            }).bind(this, i, done));
        }
    });
};

Promise.resolve = (res) => {
    return new Promise((resolve, reject) => {
        resolve(res);
    });
};

Promise.reject = (err) => {
    return new Promise((resolve, reject) => {
        reject(err);
    });
};

module.exports = Promise;

// -----------------------------------------------------
var test = () => {
    var p = new Promise((resolve, reject) => {
        resolve('bud');
        // reject('butt');
    });

    p.then((res) => {
        console.log('res: ' + res);
    }).catch((err) => {
        console.log('err: ' + err);
    });

    Promise.all([
        new Promise((resolve, reject) => {
            resolve('duck');
        }),
        new Promise((resolve, reject) => {
            resolve('pant');
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
        new Promise((resolve, reject) => {
            resolve('duck');
        }),
        new Promise((resolve, reject) => {
            resolve('pant');
            // reject('bucket');
        }),
        // Promise.reject('no dogs!'),
        Promise.resolve('dogs')

    ]).then((res) => {
        console.log('Promise.race res: ' + JSON.stringify(res));
    }).catch((err) => {
        console.log('Promise.race err: ' + JSON.stringify(err))
    });
};
