module.exports.customError = (res, statusNum, errTxt) => {
  res.status(statusNum).send({ message: errTxt });
};
