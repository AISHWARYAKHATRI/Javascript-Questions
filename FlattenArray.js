const flattenArray = (arr, depth = 1) => {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 1) {
      return acc.concat(flattenArray(item, depth - 1));
    } else {
      return acc.concat(item);
    }
  }, []);
};

console.log(
  flattenArray(
    [
      [[[1, 1]], 2, 3],
      [4, 5],
    ],
    1
  )
);
