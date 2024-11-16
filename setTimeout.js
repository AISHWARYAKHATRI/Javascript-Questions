setTimeout(() => console.log("Test100"), 100); // 2
setTimeout(() => console.log("Test5000"), 5000); // 3
setTimeout(() => console.log("Test50"), 50); // 1

const myFun = new Function("a", "b", "console.log(a + b)");
myFun(1, 2);

const test = fetch("http://google.com"); // Node 18+ natively supports fetch with additional libraries. Eliminates the need for additional libraries like node-fetch. And works consistently accross environments both brower and Node.js env
console.log(test);

// const promise = new Promise(); // this will give error because resolver undefined
// console.log(promise);

// Creation phase
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Promise");
    resolve("Promise done");
  }, 2000);
});

// Consumption phase
promise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log("error:", err);
  })
  .finally(function () {
    console.log("Final block");
  });

const obj = {};
const mySecretKey = Symbol("secret");
obj[mySecretKey] = "Test";

console.log(obj);
