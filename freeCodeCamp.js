// Functions in JavaScript
// Q1 - What is function declaration?

const { time, timeEnd, log } = require("console");

function square(num) {
  return num * num;
}

(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

// for (let i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, i * 1000);
// }

var p = 10;

const fun = function () {
  console.log(p);
  var p = 11;
};

fun();

const fn = (a, x, y, ...numbers) => {
  console.log(x, y);
};

fn(4, 5, 6, 7, 9);

// document.addEventListener("click", function () {}); // eg of callback function

function normalFun() {
  console.log(arguments, this);
}

normalFun(1, 2, 3, 4, 5, 6, 7);

const arrowFun = () => {
  console.log(arguments);
};

arrowFun(1, 3, 4, 5, 6, 7);

let user = {
  userName: "Admin",
  rc1: () => {
    console.log(this.userName);
  },
  rc2: function () {
    console.log(this.userName);
  },
};

user.rc1();
user.rc2();

// global
function local() {
  // local
  var name1 = "John";
}
// console.log(name1); //cant do this. name1 is not accessible

local();

function subscribe() {
  var name = "Aishwarya";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

subscribe()();

// 1)  What will be logged

let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1; // shadowing, block scope
    console.log(count);
  }
  console.log(count);
})();

// 2)  Write a function that would allow you to do this

var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 20

function createBase(x) {
  return function addSix(y) {
    console.log(x + y);
  };
}

// 3) Time Optimizaition

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

// Without closures
console.time("6");
find(6);
console.timeEnd("6");

console.time("50");
find(50);
console.timeEnd("50");

// With closures
const closure = find();
console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");

// 4) setTimeout Output

function a() {
  for (var i = 0; i < 3; i++) {
    function inner(i) {
      setTimeout(function log() {
        console.log(i);
      }, i * 1000);
    }
    inner(i);
  }
}

a();
// 3 3 3
// Settimeout runs only after the entire code has ran successfully
// var is function scope 3 3 3
// let is block scope 0 1 2

// 5) How would you use a closure to create a private counter?

function counter() {
  var _count = 0;

  function add(value) {
    _count += value;
  }

  function retrieve() {
    console.log("Counter = " + _count);
  }

  return {
    add,
    retrieve,
  };
}

const c = counter();
c.add(1);
c.retrieve();
// Here we are not directly manipulating the counter but functions to manipualte the count valye

// 6) What is a module pattern ?

var Module = (function () {
  function privateMethod() {
    console.log("private");
  }

  return {
    publicMethod: function () {
      // can call privateMethod
      console.log("public");
    },
  };
})();

Module.publicMethod();

// 7) Make this run only once

let view;
function likeTheVideo() {
  let called = 0;
  return function () {
    if (called > 0) {
      console.log("Already subscribed");
    } else {
      view = "CodeWithAish";
      console.log("Subscribe to", view);
      called++;
    }
  };
}

let isSubscribed = likeTheVideo();
isSubscribed();
isSubscribed();
isSubscribed();

// 8) Once polyfill (More generic version of the above function)

function once(func, context) {
  console.log("context", context);
  let ran;

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const hello = once((a, b) => console.log("hello", a, b));

hello(1, 2);
hello();
hello();

// 9) Implement Caching/Memoize function

function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    } else {
      return res[argsCache];
    }
  };
}

const clumsyProduct = (num1, num2) => {
  for (let i = 0; i <= 10000000; i++) {}

  return num1 * num2;
};

const memoizedClumsyProduct = myMemoize(clumsyProduct);

console.time("FirstCall");
console.log(memoizedClumsyProduct(9898, 3984));
console.timeEnd("FirstCall");

console.time("SecondCall");
console.log(memoizedClumsyProduct(9898, 3984));
console.timeEnd("SecondCall");

// 10) Differnce between closure and scope (Notebook )

// 11) Currying.
// Example f(a, b) into f(a)(b)

function f(a, b) {
  console.log(a, b);
}

function f1(a) {
  return function (b) {
    console.log(a, b);
  };
}

console.log(f1(5)(6));

// Currying
// 1) sum(2)(6)(1)

// Normal
function sum(a, b, c) {
  console.log(a, b, c);
}

// Currying
function p1(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(p1(2)(6)(1));

// 2)
/* 
evaluate("sum")(4)(2)
evaluate("multiply")(4)(2)
evaluate("divide")(4)(2)
evaluate("subtract")(4)(2)
*/

function evaluate(op) {
  return function (a) {
    return function (b) {
      if (op === "sum") return a + b;
      else if (op === "multiply") return a * b;
      else if (op === "divide") return a / b;
      else if (op === "subtract") return a - b;
      else return "";
    };
  };
}

console.log(evaluate("multiply")(90)(100));

const mul = evaluate("multiply"); // mul has the function returned to it
console.log(mul(2)(1000));

// 3) Infinite currying -> sum(1)(2)(3).....(n)

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(5)(7)(4)(8)(10)());

// 4) Currying vs Partial Application

function curry(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = curry(10);
console.log(x(2, 3));

// or

console.log(curry(10)(2, 3)); // 3 arguments but only 2 nested functions
// The above is not currying. It is partial application

// 5) Manipulating DOM

function updateElementText(id) {
  return function (text) {
    document.querySelector("#" + id).textContent = text;
  };
}

const updateHeader = updateElementText("heading");

// updateHeader("Hello");
// The above function can be used again and again according to the condition, so that we don't
// have to use querySelector again and again

// 6) curry() implementation
// Converts f(a, b, c) into f(a)(b)(c)4

function convertToCurry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const test = (a, b, c) => a + b + c;

const curryTest = convertToCurry(test);

console.log(curryTest(1)(2)(3));
