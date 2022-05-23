const getType = (arg) => {
  return Object.prototype.toString.call(arg).slice(8, -1);
};

export default getType;
