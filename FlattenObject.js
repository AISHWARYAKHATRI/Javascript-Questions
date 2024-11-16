function flattenObj(obj, parent) {
  const finalObj = {};
  const generateFlatObject = (obj, parent) => {
    for (let key in obj) {
      const newParent = parent + key;
      if (typeof obj[key] === "object") {
        generateFlatObject(obj[key], newParent + ".");
      } else {
        finalObj[newParent] = obj[key];
      }
    }
  };
  generateFlatObject(obj, parent);
  return finalObj;
}

const obj = {
  A: 12,
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(flattenObj(obj, ""));
// Output: { A: 12, B: 23, 'C.P': 23, 'C.O.L': 56, 'C.Q.0': 1, 'C.Q.1': 2 }
// For array typeof array is object and the key becomes the index
