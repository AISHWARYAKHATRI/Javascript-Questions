// Implement a function to retry a promise N times. If it fails after N times, reject the promise.
const fetchData = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.9) resolve("Success");
    else reject("Failed");
  });
};

const retryPromise = (fn, retries) => {
  return new Promise((resolve, reject) => {
    const attemptPromise = (retries) => {
      fn()
        .then(resolve)
        .catch((err) => {
          if (retries <= 0) reject(err);
          else attemptPromise(retries - 1);
        });
    };
    attemptPromise(retries);
  });
};

retryPromise(fetchData, 3)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
