export function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function min(num1, num2) {
  return Math.min(num1, num2);
}