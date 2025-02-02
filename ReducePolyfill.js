// Implement polyfill for Array.reduce()

const arr = [1, 2, 3];

function myReduce(callback, initialValue) {
  if (!this) throw new Error("Array is not defined");
  let array = this;
  let accumulator;
  let n = array.length;
  let index = 0;
  if (n === 0) {
    if (!initialValue && initialValue !== 0)
      throw new Error(
        "You need to pass the initial value if the array is empty"
      );
    else return initialValue;
  }
  if (!initialValue && initialValue !== 0) {
    accumulator = array[index++];
  } else {
    accumulator = initialValue;
  }
  while (index < n) {
    accumulator = callback(accumulator, array[index], index, array);
    index++;
  }
  return accumulator;
}

Array.prototype.myReduce = myReduce;

const res1 = arr.myReduce((acc, val) => {
  acc = acc + val;
  return acc;
}, 1);

console.log("myreduce", res1);
