/**
 * @param min
 * @param max
 * @param returnType
 */
export const randomGenerator = (min, max, returnType) => {
  let resultValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return returnType === 'string' ? resultValue.toString() : resultValue;
};
