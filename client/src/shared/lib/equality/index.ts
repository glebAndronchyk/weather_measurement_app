export const deepEqual = function (x: object, y: object) {
  if (x === y) {
    return true;
  } else if (
    typeof x == "object" &&
    x != null &&
    typeof y == "object" &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (const prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        const castedProp = prop as keyof typeof x;
        if (!deepEqual(x[castedProp], y[castedProp])) return false;
      } else return false;
    }

    return true;
  } else return false;
};
