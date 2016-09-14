const createPromise = (fttc, context) => {
  if (typeof(fttc) !== 'function') {
    throw new Error('A function must be the first argument!');
  }
  return (...args) => {
    return new Promise((resolve, reject) => {
      fttc.apply(context, args.concat((err, ...res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 1) {
            resolve(res);
          } else {
            resolve(res[0]);
          }
        }
      }));
    });
  };
};
module.exports = createPromise;
