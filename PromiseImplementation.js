const States = {
  PENDING: "Pending",
  FULLFILLED: "Fullfilled",
  REJECTED: "Rejected",
};

class MyPromise {
  #promiseState = States.PENDING;
  #handlers = [];
  constructor(cb) {
    cb(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value) {
    this.#promiseState = States.FULLFILLED;
    this.#handlers.forEach((fn) => fn(value));
  }
  reject(value) {}
  then(cb) {
    this.#handlers.push(cb);
  }
  catch() {}
  finally() {}
}

const promise = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Settimeout from MyPromise resolved");
  }, 2000);
}).then(function (data) {
  console.log(data);
});

// const p = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log("Done");
//     resolve("resolved");
//   }, 1000);
// });

// console.log(p);
