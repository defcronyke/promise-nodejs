class Promise {
    constructor(f) {
        this.f = f;
        process.nextTick(() => {
            this.res = this.f(this.resolve.bind(this), this.reject.bind(this));
        });
    }

    resolve(res) {

        this.param = res;

        if (this.thenCallback) {
            process.nextTick(() => {
                this.res = this.thenCallback(res);
            });
        }
    }

    reject(err) {

        this.errParam = err;

        if (this.catchCallback) {
            process.nextTick(() => {
                this.errRes = this.catchCallback(err);
            });
        }
    }

    then(callback) {
        this.thenCallback = callback;

        if (this.res == null && this.param) {
            this.res = this.thenCallback(this.param);
        }

        return this;
    }

    catch(callback) {
        this.catchCallback = callback;

        if (this.errRes == null && this.errParam) {
            process.nextTick(() => {
                this.errRes = this.catchCallback(this.errParam);
            });
        }

        return Promise.resolve(this.errRes);
    }
}

Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        var resArr = [];
        for (var i = 0; i < promises.length; i++) {
            resArr.push(null);
        }

        for (var i = 0; i < promises.length; i++) {
            process.nextTick(((i) => {
                var promise = promises[i];
                promise.then((res) => {
                    resArr[i] = res;

                    var completed = true;
                    for (var j = 0; j < resArr.length; j++) {
                        if (resArr[j] == null) {
                            completed = false;
                            break;
                        }
                    }

                    if (completed) {
                        resolve(resArr);
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

                if (done) {
                    return;
                }

                var promise = promises[i];
                promise.then((res) => {
                    resolve(res);
                    done = true;
                    return;
                }).catch((err) => {
                    reject(err);
                    done = true;
                    return;
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
