function deepCopy(obj) {
  if (typeof obj != "object" || obj === null) {
    return obj;
  }
  const copiedObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    copiedObj[key] = deepCopy(value);
  }
}
