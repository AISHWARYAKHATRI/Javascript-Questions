// Write polyfill of Promise.all
const dummyApi = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(time), time);
  });
};

const taskArray = [dummyApi(1000), dummyApi(3000), dummyApi(5000)];

const promisePolyfill = (taskArray) => {
  return new Promise((resolve, reject) => {
    const output = [];
    taskArray.forEach((promise, index) => {
      promise
        .then((data) => {
          output[index] = data;
          if (index === taskArray.length - 1) resolve(output);
        })
        .catch((err) => reject(err));
    });
  });
};

promisePolyfill(taskArray)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
