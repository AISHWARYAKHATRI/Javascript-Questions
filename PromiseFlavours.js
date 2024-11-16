const createAsyncTask = (data, time, needToReject) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (needToReject) reject(data);
      else resolve(data);
    }, time);
  });
};

const p1 = createAsyncTask("p1", 10, true);
const p2 = createAsyncTask("p2", 400);
const p3 = createAsyncTask("p3", 2000);
const p4 = createAsyncTask("p4", 700);

p1.then(console.log).catch((e) => console.log(e));
p2.then(console.log);
p3.then(console.log);
p4.then(console.log);

// All 4 will start at same time and the max time will the same as of the Promise which resolved last
// The difference between both the above and below code is nothing, both of them are firing the promise at the same time
// The disadvanatage of promise.all is that if any one gets rejected, then all of them will be rejected
Promise.all([p1, p2, p3, p4])
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

//  To overcome the problem of Promise.all, the below will give us the results of all the promises.
// It just has the then block only
// catch block will not be execcuted
// This is an improvement over all
Promise.allSettled([p1, p2, p3, p4]).then((data) => {
  console.log(data);
  //   { status: 'rejected', reason: 'p1' },
  //   { status: 'fulfilled', value: 'p2' },
  //   { status: 'fulfilled', value: 'p3' },
  //   { status: 'fulfilled', value: 'p4' }
});

// In this case the callback of the very first resolved/rejected promise will be executed
Promise.race([p1, p2, p3, p4])
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

// This just looks at the winner
// In this case if all the promises are rejected then the catch block will be executed else it will go in then
Promise.any([p1, p2, p3, p4])
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

// Promise with resolvers
const createAsyncTask2 = (data, time, needToReject) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  setTimeout(() => {
    if (needToReject) reject(data);
    else resolve(data);
  }, time);
  return promise;
};

const p11 = createAsyncTask("p11", 20);
p11.then(console.log);

// Que: Input: Array of promises. Execute them sequentially
const serial = async (arr) => {
  for (let pro of arr) {
    const res = await pro;
    console.log("serial", res);
  }
};

serial([p11, p2, p3, p4]);
