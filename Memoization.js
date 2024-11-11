const memoize = (fn) => {
  return function (...args) {
    const cache = {};
    // console.log(typeof arguments, typeof args, Array.isArray(arguments)); // object object false
    const argsString = JSON.stringify(args);
    if (argsString in cache) {
      console.log(`Fetching from cache from args: ${argsString}`);
      return cache[argsString];
    } else {
      console.log(`Computing values for args: ${argsString}`);
      const result = fn.apply(this, args);
      cache[argsString] = result;
      return result;
    }
  };
};

const addFun = (a, b, c) => a + b + c;

const add = memoize(addFun);

console.log(add(1, 2, 3));
console.log(add(1, 2, 3)); // Brings the value from cache

const factorial = (memoizedFunc, x) => {
  if (x === 0) return 1;
  return x * memoizedFunc(x - 1);
};

const memoizedFactorial = memoize((x) => factorial(memoizedFactorial, x));

console.log(memoizedFactorial(5)); // 120
console.log(memoizedFactorial(6)); // 720, and it uses the cached result for factorial(5)
