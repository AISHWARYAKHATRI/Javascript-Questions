// const promise = new Promise((reolve, reject) => {
//   reject(Error("Failed"));
// });

// promise.catch((err) => console.log(err.message));
// promise.catch((err) => console.log(err.message));
// promise.catch((err) => console.log(err.message));
// promise.catch((err) => console.log(err.message));
// promise.catch((err) => console.log(err.message));

// console.log("start");
// const fun = () => {
//   const promise = new Promise((resolve, reject) => {
//     resolve(1);
//   });
//   return promise;
// };

// const test = async () => {
//   console.log("test");
//   //   const test = fun().then((result) => console.log(result));
//   const test = await fun();
//   console.log(test);
//   console.log("test1");
//   console.log("test2");
// };

// // console.log(test());
// test();

// const obj = {
//   then: (res, rej) => {
//     setTimeout(() => {
//       console.log("Special Obj");
//       res();
//     }, 2000);
//   },
// };

// async function trigger() {
//   await obj;
//   console.log("2");
// }

// trigger();
// console.log("Hey"); // Output: Hey Special Obj 2

function one() {
  console.log(1);
  two();
}

async function two() {
  console.log(2);
  await third();
  console.log(3);
}

async function third() {}

one();
console.log(4); // Output: 1 2 4 3
